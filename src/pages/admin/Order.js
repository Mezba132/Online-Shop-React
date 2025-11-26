import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Link } from "react-router-dom";
import {
  listOrders,
  getStatusValues,
  updateOrderStatus,
} from "../../services/AdminService";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statusVlaues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticate();

  const loadOrders = () => {
    listOrders(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const showOrders = () => {
    if (orders.length > 0) {
      return (
        <h2 className="text-success display-2">
          Total Orders : {orders.length}
        </h2>
      );
    } else {
      return <h4 className="text-danger display-2">No Orders</h4>;
    }
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setStatusValues(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleStatusChange = (e, oid) => {
    console.log(e.target.value + "    " + oid);
    updateOrderStatus(user._id, token, oid, e.target.value).then((data) => {
      console.log(data);
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status : {order.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusVlaues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-ms-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <Layout
      title="Orders List"
      description={`Hello ${user.name}, Manage your all orders`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrders()}
          {orders.map((order, orderIndex) => {
            return (
              <div
                className="mt-5"
                key={orderIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID : {order._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(order)}</li>
                  <li className="list-group-item">
                    Transaction ID : {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount : {order.amount}</li>
                  <li className="list-group-item">
                    Ordered By : {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered On : {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address : {order.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {order.products.length}
                </h3>

                {order.products.map((product, productIndex) => (
                  <div
                    className="mb-4"
                    key={productIndex}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("product Name", product.name)}
                    {showInput("product Price", product.price)}
                    {showInput("product Total", product.count)}
                    {showInput("product ID", product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
