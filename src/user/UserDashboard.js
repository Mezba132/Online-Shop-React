import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./UserApi";
import moment from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const auth = isAuthenticate();
  const _id = auth && auth.user ? auth.user._id : null;
  const name = auth && auth.user ? auth.user.name : "";
  const email = auth && auth.user ? auth.user.email : "";
  const role = auth && auth.user ? auth.user.role : 0;
  const token = auth && auth.token ? auth.token : null;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (!data) return;
      if (data && data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">Name : {name}</li>
        <li className="list-group-item">Email : {email}</li>
        <li className="list-group-item">
          Type : {role === 1 ? "admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {history.map((history, i) => {
            return (
              <div>
                <hr />
                {history.products.map((product, i) => {
                  return (
                    <div key={i}>
                      <h6>Product Name: {product.name}</h6>
                      <h6>Product Price: {product.price}</h6>
                      <h6>
                        Product Date: {moment(product.createdAt).fromNow()}
                      </h6>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="DashBoard"
      description={`Hello ${name}`}
      className="container"
    >
      <h1 className="mb-5">Welcome to User Dashboard</h1>

      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
