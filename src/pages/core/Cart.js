import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { showItems } from "../../utils/CartHelpers";
import Card from "../../components/cards/ProductCard";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(showItems());
  }, [run]);

  const showCartItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} Products</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCart={false}
            cartUpdate={true}
            showRemoveButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const showNoItems = () => (
    <h2>
      Your Cart is Empty.
      <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout className="container-fluid">
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showCartItems(items) : showNoItems()}
        </div>
        <div className="col-6">
          <h1 className="mb-4">Your Cart Info</h1>
          <Checkout product={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
