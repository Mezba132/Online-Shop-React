import React, { useState, useEffect } from "react";
import {
  getBrainTreeClientToken,
  processPaymentMethod,
  createOrder,
} from "../../services/CoreService";
import { isAuthenticate } from "../../services/AuthService";
import { emptyCart } from "../../utils/CartHelpers";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ product, setRun, run }) => {
  const [data, setData] = useState({
    isLoading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const { success, clientToken, error, instance, address } = data;

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  useEffect(() => {
    const getToken = (userId, token) => {
      getBrainTreeClientToken(userId, token).then((data) => {
        if (data.error) {
          setData({ ...data, error: data.error });
        } else {
          setData({ clientToken: data.clientToken });
        }
      });
    };
    getToken(userId, token);
  }, [userId, token]);

  const getTotal = () => {
    return product.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticate() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  const buy = () => {
    setData({ isLoading: true });
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        let paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(product),
        };

        processPaymentMethod(userId, token, paymentData)
          .then((result) => {
            if (result.error) {
              setData({ ...data, error: result.error, isLoading: false });
            } else {
              const createOrderData = {
                products: product,
                transaction_id: result.transaction.id,
                amount: result.transaction.amount,
                address: address,
              };

              createOrder(userId, token, createOrderData)
                .then((response) => {
                  emptyCart(() => {
                    setData({ success: response.success, isLoading: false });
                    setRun(!run);
                  });
                })
                .catch((err) => {
                  setData({ isLoading: false });
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            setData({ isLoading: false });
            console.log(err);
          });
      })
      .catch((err) => {
        setData({ ...data, error: err.message, isLoading: false });
      });
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    data.isLoading && (
      <div className="alert alert-info">Loading...</div>
    );

  const showSuccess = () => (
    <div
      className="alert alert-primary"
      style={{ display: success ? "" : "none" }}
    >
      Thank You! Your Payment was successful.
    </div>
  );

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {clientToken !== null && product.length > 0 ? (
        <div className="card-body">
          <div className="form-group mb-3">
            <label className="text-muted">Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={address}
              placeholder="Your Delivery Address"
            />
          </div>
          <DropIn
            options={{
              authorization: clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2>Total Amount: {getTotal()} Tk</h2>
      </div>
      <div className="card-body">
        {showLoading()}
        {showSuccess()}
        {showError()}
        {showCheckout()}
      </div>
    </div>
  );
};

export default Checkout;