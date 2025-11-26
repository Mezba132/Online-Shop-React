import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { signup } from "../../services/AuthService";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (value) => (e) => {
    setValues({
      ...values,
      error: false,
      [value]: e.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        if (data.err) {
          setValues({
            ...values,
            error: data.err,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account is Created. Please <Link to="/signin">SignIn</Link>
    </div>
  );

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="SignUp"
      description="SignUp to E-Commerce Site for NodeJS, ReactJS"
      className="cotainer col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
      {/*{JSON.stringify(values)}*/}
    </Layout>
  );
};

export default SignUp;
