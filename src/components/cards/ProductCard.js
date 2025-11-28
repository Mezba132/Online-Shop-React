import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "../../utils/CartHelpers";
import "../../assets/css/card.css";

const ProductCard = ({
  product,
  showProductButton = true,
  showAddToCart = true,
  cartUpdate = false,
  showRemoveButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showButton = () => {
    return (
      showProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // a bug is fixed here
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showCartButton = () => {
    return (
      showAddToCart && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const removeCartItem = () => {
    return (
      showRemoveButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-warning badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (e) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  const showUpdateCart = () => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Add More</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card product-card">
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div className="product-image-container">
          <ShowImage item={product} url="products" />
        </div>
        <div className="product-details">
          <h5 className="product-name">{product.name}</h5>
          <p className="product-price">${product.price}</p>
          <p className="product-description text-truncate">
            {product.description}
          </p>
          <div className="product-meta">
            <span className="product-category">
              {product.category && product.category.name}
            </span>
            <span className="product-date">
              {moment(product.createdAt).fromNow()}
            </span>
          </div>
        </div>
        {showStock(product.quantity)} <br />
        {showButton(showProductButton)}
        {showCartButton(showAddToCart)}
        {removeCartItem(showRemoveButton)}
        {showUpdateCart(cartUpdate)}
      </div>
    </div>
  );
};

export default ProductCard;
