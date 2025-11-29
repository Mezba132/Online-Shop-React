import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "../../utils/CartHelpers";
import "../../assets/css/card.css";

const ProductCard = ({
  product,
  showProduct = true,
  showAddToCart = true,
  cartUpdate = false,
  showRemoveButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [count, setCount] = useState(product.count);
  const [showAddToCartButton, setShowAddToCartButton] = useState(showAddToCart);

  const viewProduct = () => {
    return (
      showProduct && (
        <Link to={`/product/${product._id}`} className="me-2">
          <i className="fas fa-eye text-primary"></i>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setShowAddToCartButton(false);
    });
  };

  const viewCart = () => {
    return (
      showAddToCartButton && (
        <span
          onClick={addToCart}
          style={{ cursor: "pointer" }}
          className="ms-2"
        >
          <i className="fas fa-cart-plus text-warning"></i>
        </span>
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
    if (quantity == null) return null;
    return quantity > 0 ? (
      <span className="badge bg-primary rounded-pill text-white">In Stock</span>
    ) : (
      <span className="badge bg-warning rounded-pill text-dark">
        Out of Stock
      </span>
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
        <div className="product-image-container">
          <ShowImage item={product} url="products" />
        </div>
        <div className="product-details">
          <h5 className="product-name">{product.name}</h5>
          <p className="product-price">৳{product.price}</p>
          <div className="product-meta">
            <span className="product-category">
              {product.category && product.category.name}
            </span>
            <span className="product-date">
              {moment(product.createdAt).fromNow()}
            </span>
          </div>
          <div>{showStock(product?.quantity ?? product?.count ?? 0)}</div>
        </div>
        <br />
        {viewProduct(showProduct)}
        {viewCart()}
        {removeCartItem(showRemoveButton)}
        {showUpdateCart(cartUpdate)}
      </div>
    </div>
  );
};

export default ProductCard;
