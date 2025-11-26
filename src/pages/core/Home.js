import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getProducts, list } from "../../services/CoreService";
import Card from "../../components/cards/ProductCard";
import "../../assets/css/home.css";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

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

  const searchData = () => {
    if (search) {
      list({ search: search || undefined })
        .then((response) => {
          if (!response) return;
          if (response && response.error) {
            setError(response.error);
          } else {
            setResults(response);
            setSearched(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setResults([]);
      setSearched(false);
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSearched(false);
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };

  const searchProducts = (results = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
      <div className="row">
        {results.map((product, i) => (
          <div key={i} className="col-md-4 mb-5">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  const searchForm = () => (
    <div className="search-container-home">
        <form onSubmit={searchSubmit} className="search-form-home">
            <input
                type="search"
                className="form-control"
                onChange={handleChange}
                placeholder="Search by Name"
            />
            <button className="input-group-text">Search</button>
        </form>
    </div>
);


  return (
    <Layout className="container-fluid">
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to E-Shop</h1>
          <p>The best place to find your favorite products</p>
          {searchForm()}
        </div>
      </div>

      {searched ? (
        searchProducts(results)
      ) : (
        <>
          <div className="product-section">
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
              {productByArrival.map((product, i) => (
                <div key={i} className="col-md-4 mb-5">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-section">
            <h2 className="mb-4">Most Sells Products</h2>
            <div className="row">
              {productBySell.map((product, i) => (
                <div key={i} className="col-md-4 mb-5">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
