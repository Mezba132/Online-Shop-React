import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../services/AuthService";
import Layout from "../../components/layout/Layout";
import "../../assets/css/auth.css";

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
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout className="container">
      <div className="auth-container">
        <div className="auth-left">
          <h1>Join Us!</h1>
          <p>Already have an account?</p>
          <Link to="/signin" className="btn-auth">
            Sign In
          </Link>
        </div>
        <div className="auth-right">
          <div className="auth-form-container">
            <h2>Sign Up</h2>
            {showError()}
            {showSuccess()}
            {signUpForm()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
