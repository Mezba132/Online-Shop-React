import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../auth";
import { totalCartItem } from "./CartHelpers";

const isActive = (history, path) => {
  return history.location.pathname === path ? "nav-link active" : "nav-link";
};

const Header = ({ history }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Online Shop
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={isActive(history, "/cart")} to="/cart">
              Cart{" "}
              <span className="badge bg-warning text-dark ms-1">
                {totalCartItem()}
              </span>
            </Link>
          </li>

          {isAuthenticate() && isAuthenticate().user.role === 0 && (
            <li className="nav-item">
              <Link
                className={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                DashBoard
              </Link>
            </li>
          )}

          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <li className="nav-item">
              <Link
                className={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                DashBoard
              </Link>
            </li>
          )}

          {!isAuthenticate() && (
            <>
              <li className="nav-item">
                <Link className={isActive(history, "/signup")} to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className={isActive(history, "/signin")} to="/signin">
                  SignIn
                </Link>
              </li>
            </>
          )}

          {isAuthenticate() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => signout(() => history.push("/"))}
              >
                SignOut
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(Header);
