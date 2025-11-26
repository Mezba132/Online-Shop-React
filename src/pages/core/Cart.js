import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { showItems } from "../../utils/CartHelpers";
import Card from "../../components/cards/ProductCard";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import "../../assets/css/home.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(showItems());
  }, [run]);

  const showCartItems = (items) => {
    return (
      <div>
        <h2 className="mb-4">Your cart has {`${items.length}`} Products</h2>
        <hr />
        <div className="row">
          {items.map((product, i) => (
            <div key={i} className="col-md-12 mb-4">
              <Card
                product={product}
                showAddToCart={false}
                cartUpdate={true}
                showRemoveButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const showNoItems = () => (
    <div className="text-center">
      <h2 className="mb-4">
        Your Cart is Empty.
        <br />
        <Link to="/shop">Continue Shopping</Link>
      </h2>
    </div>
  );

  return (
    <Layout className="container-fluid">
      <div className="banner">
        <div className="banner-content">
          <h1>Your Cart</h1>
          <p>Review and checkout</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {items.length > 0 ? showCartItems(items) : showNoItems()}
          </div>
          <div className="col-md-4">
            <div className="product-section">
              <h2 className="mb-4">Your Cart Info</h2>
              <Checkout product={items} setRun={setRun} run={run} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;