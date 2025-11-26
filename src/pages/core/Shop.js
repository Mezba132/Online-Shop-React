import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getCategories, getFilteredProducts } from "../../services/CoreService";
import CheckBox from "../../components/shared/CheckBox";
import { prices } from "../../utils/FixedPrices";
import RadioBox from "../../components/shared/RadioBox";
import Card from "../../components/cards/ProductCard";
import "../../assets/css/home.css"; 

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8); 
  const [filteredResult, setFilteredResult] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const init = () => {
      getCategories()
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setCategories(result);
          }
        })
        .catch((err) => console.log(err));
    };
    init();
  }, []);

  useEffect(() => {
    const loadFilteredResults = () => {
      getFilteredProducts(0, limit, myFilters.filters)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          } else {
            setFilteredResult(result.data);
            setSize(result.size);
            setSkip(0);
          }
        })
        .catch((err) => console.log(err));
    };
    loadFilteredResults();
  }, [myFilters, limit]);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrices(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters);
  };

  const handlePrices = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
        break; 
      }
    }
    return array;
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters)
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setFilteredResult([...filteredResult, ...result.data]);
          setSize(result.size);
          setSkip(toSkip);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  return (
    <Layout className="container-fluid">
      <div className="banner">
        <div className="banner-content">
          <h1>Shop</h1>
          <p>Find the best products for you</p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="filter-section">
              <div className="filter-card">
                <h4 className="filter-title">Filter By Categories</h4>
                <CheckBox
                  categories={categories}
                  handleFilters={(filters) => handleFilters(filters, "category")}
                />
              </div>
              <div className="filter-card">
                <h4 className="filter-title">Filter By Price Range</h4>
                <RadioBox
                  prices={prices}
                  handleFilters={(filters) => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="product-section">
              <h2 className="mb-4">Products</h2>
              <div className="row">
                {filteredResult.map((product, i) => (
                  <div key={i} className="col-md-4 mb-5">
                    <Card product={product} />
                  </div>
                ))}
              </div>
              <hr />
              <div className="text-center">{loadMoreButton()}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;