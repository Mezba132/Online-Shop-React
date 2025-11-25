import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./CoreApi";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (!data) return;
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (!data) return;
      if (data && data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <Layout
      title="Home"
      description="E-Commerce Site for NodeJS, ReactJS"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productByArrival.map((product, i) => (
          <div key={i} className="col-3 mb-5">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Most Sells Products</h2>
      <div className="row">
        {productBySell.map((product, i) => (
          <div key={i} className="col-3 mb-5">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
