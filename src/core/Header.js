import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../auth";
import { totalCartItem } from "./CartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Header = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">E-Shop</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">
                            Cart <span className="badge bg-warning text-dark">{totalCartItem()}</span>
                        </Link>
                    </li>
                    {isAuthenticate() && isAuthenticate().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                        </li>
                    )}
                    {isAuthenticate() && isAuthenticate().user.role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                        </li>
                    )}
                    {!isAuthenticate() && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                    {isAuthenticate() && (
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() =>
                                    signout(() => {
                                        history.push("/");
                                    })
                                }
                            >
                                Signout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </nav>
);

export default withRouter(Header);
