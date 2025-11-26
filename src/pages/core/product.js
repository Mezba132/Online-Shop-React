import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { read, relatedProducts } from "../../services/CoreService";
import Card from "../../components/cards/ProductCard";
import "../../assets/css/home.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    const loadSingleProduct = () => {
      const productId = props.match.params.productId;
      read(productId)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setProduct(response);
            relatedProducts(response._id).then((data) => {
              if (data.error) {
                setError(data.error);
              } else {
                setRelatedProduct(data);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    };
    loadSingleProduct();
  }, [props.match.params.productId]);

  return (
    <Layout className="container-fluid">
      <div className="banner">
        <div className="banner-content">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="product-section">
              {product && product.description && (
                <Card product={product} showProductButton={false} />
              )}
            </div>
          </div>
        </div>
        <div className="product-section">
          <h2 className="mb-4">Related Products</h2>
          <div className="row">
            {relatedProduct.map((p, i) => (
              <div key={i} className="col-md-4 mb-5">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;