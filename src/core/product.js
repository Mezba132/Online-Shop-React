import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, relatedProducts } from "./CoreApi";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const loadSigleProduct = (productId) => {
    read(productId)
      .then((response) => {
        if (!response) return;
        if (response && response.error) {
          setError(response.error);
        } else {
          setProduct(response);
          relatedProducts(response._id).then((data) => {
            if (!data) return;
            if (data && data.error) {
              setError(data.error);
            } else {
              setRelatedProduct(data);
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSigleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product.name}
      description={
        product &&
        product.description &&
        product.description.substring(0, 80) + "..."
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mb-4">
          {product && product.description && (
            <Card product={product} showProductButton={false} />
          )}
        </div>
      </div>
      <h1>Related Products</h1>
      <div className="row">
        {relatedProduct.map((product, i) => (
          <div key={i} className="col-3 mb-4">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Product;
