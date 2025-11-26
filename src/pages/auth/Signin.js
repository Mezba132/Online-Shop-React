import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { signin, authenticate, isAuthenticate } from "../../services/AuthService";
import "../../assets/css/auth.css";

const SignIn = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, error, loading, redirectToReferrer } = values;

    const { user } = isAuthenticate();

    const handleChange = (value) => (e) => {
        setValues({
            ...values,
            error: "",
            [value]: e.target.value,
        });
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        signin({ email, password, error, loading, redirectToReferrer })
            .then((data) => {
                if (!data) {
                    setValues({ ...values, error: "Server error", loading: false });
                    return;
                }
                if (data && data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false,
                    });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,
                        });
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

    const showLoading = () =>
        loading && (
            <div
                className="alert alert-info"
                style={{ display: loading ? "" : "none" }}
            >
                <h2>Loading.........</h2>
            </div>
        );

    const redirectTo = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }

        if (isAuthenticate()) {
            return <Redirect to="/" />;
        }
    };

    const signInForm = () => (
        <form>
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
                LogIn
            </button>
        </form>
    );

    return (
        <Layout
            title="SignIn"
            description="SignIn to E-Commerce Site for NodeJS, ReactJS"
            className="container"
        >
            <div className="auth-container">
                {redirectTo()}
                <div className="auth-left">
                    <h1>Welcome Back!</h1>
                    <p>Don't have an account?</p>
                    <Link to="/signup" className="btn-auth">Sign Up</Link>
                </div>
                <div className="auth-right">
                    <div className="auth-form-container">
                        <h2>Sign In</h2>
                        {showLoading()}
                        {showError()}
                        {signInForm()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignIn;
