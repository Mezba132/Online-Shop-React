import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "../../services/AdminService";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    image: "",
    loading: false,
    error: "",
    createdProduct: "",
    RedirectToProfile: "",
    formData: "",
  });

  const { user, token } = isAuthenticate();

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    createdProduct,
    RedirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories()
      .then((result) => {
        if (result.error) setValues({ ...values, error: result.error });
        else
          setValues({
            ...values,
            categories: result,
            formData: new FormData(),
          });
      })
      .catch((err) => console.log(err));
  };

  // useEffect is similer to lifecycle hooks
  useEffect(() => {
    init();
  }, []);

  const handleChange = (data) => (event) => {
    const value =
      data === "images" ? event.target.files[0] : event.target.value;
    formData.set(data, value);
    setValues({ ...values, [data]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            image: "",
            price: "",
            quantity: "",
            error: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is Created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading....</h2>
      </div>
    );

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h6>Upload Image</h6>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("images")}
            type="file"
            name="images"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange("price")}
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please Select</option>
          {categories &&
            categories.map((cat, index) => {
              return (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showLoading()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
