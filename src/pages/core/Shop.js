import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getCategories, getFilteredProducts } from "../../services/CoreService";
import CheckBox from "../../components/shared/CheckBox";
import { prices } from "../../utils/FixedPrices";
import RadioBox from "../../components/shared/RadioBox";
import Card from "../../components/cards/ProductCard";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filteredResult, setFilteredResult] = useState([]);
  const [size, setSize] = useState(0);

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

  const handleFilters = (filters, filterBy) => {
    // console.log('Shop', filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrices(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrices = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters)
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

  useEffect(() => {
    console.log("useEffect");
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="Search and Find Your Products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h2>Filter By Categories</h2>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h2>Filter By Price Range</h2>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-8">
          <h2 className="mb-4">Search Products</h2>
          {/* {JSON.stringify(myFilters)} */}
          {/* {JSON.stringify(filteredResult)} */}
          <div className="row">
            {filteredResult.map((product, i) => (
              <div className="col-4 mb-5">
                <Card key={i} product={product} />
              </div>
            ))}
          </div>
          <hr />
          <div>{loadMoreButton()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
