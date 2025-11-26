import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Link } from "react-router-dom";
import { createCategory } from "../../services/AdminService";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((result) => {
        if (result.error) {
          setError(true);
          setSuccess(false);
        } else {
          setError(false);
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setSuccess(false);
      });
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category is created successfully</h3>;
    }
  };

  const createCategoryForm = () => (
    <form onSubmit={formSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className="form-control"
          autoFocus
          required
        />
      </div>
      <button className="btn btn-primary">Create</button>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {createCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
