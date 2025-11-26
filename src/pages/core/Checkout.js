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

const Checkout = ({ product }) => {
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

  const getToken = (userId, token) => {
    getBrainTreeClientToken(userId, token).then((data) => {
      if (!data) {
        setData({ ...data, error: "Server error" });
        return;
      }
      if (data && data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
        console.log(data);
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

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

  const deliveryAddress = data.address;

  const buy = () => {
    // send the nonce to your server
    // nonce = data.intance.requestPaymentMethod()
    setData({ isLoading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        //console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // also total to be charged
        // console.log(
        //     "send nonce and total to process : ",
        //     nonce,
        //     getTotal(product)
        // )
        let paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(product),
        };

        processPaymentMethod(userId, token, paymentData)
          .then((result) => {
            // console.log(result)
            if (!result) return;
            if (result && result.error) {
              setData({ ...data, error: result.error, isLoading: false });
            } else {
              const createOrderData = {
                products: product,
                transaction_id: result.transaction.id,
                amount: result.transaction.amount,
                address: deliveryAddress,
              };

              createOrder(userId, token, createOrderData)
                .then((response) => {
                  if (!response) return;
                  emptyCart(() => {
                    console.log("Thanks dude");
                    setData({ success: response.success, isLoading: false });
                  });
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        // console.log("dropin err : ", err);
        setData({ ...data, error: err.message });
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

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Loading... Loading...
    </div>
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
    // onBlur triggered when mouse cliked on page
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && product.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Your Delivery Address"
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
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
    <div>
      <h1>Total Amount : {getTotal()} Tk</h1>
      <hr />
      {showLoading()}
      {showSuccess()}
      {showError()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
