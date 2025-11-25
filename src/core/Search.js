import React, { useState, useEffect } from "react";
import { getCategories, list } from "./CoreApi";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [error, setError] = useState(false);

  const { categories, category, search, results, searched } = data;

  const loadcategories = () => {
    getCategories().then((data) => {
      if (!data) return;
      if (data && data.error) {
        setError(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadcategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category })
        .then((response) => {
          if (!response) return;
          if (response && response.error) {
            console.log("failed to get data");
            setError(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">ALL</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by Name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

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
          <div key={i} className="col-3 mb-5">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      {/* {JSON.stringify(results)} */}
      <div className="container mb-3">{searchProducts(results)}</div>
    </div>
  );
};

export default Search;
