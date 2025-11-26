import React from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();

  const adminLinks = () => (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="create/product">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
            View Orders
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/user/dashboard">
            View Profile
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">Name : {name}</li>
        <li className="list-group-item">Email : {email}</li>
        <li className="list-group-item">
          Type : {role === 1 ? "admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout className="container">
      <h1 className="mb-5">Welcome to User Dashboard</h1>

      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
