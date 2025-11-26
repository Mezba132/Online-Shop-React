import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Core components
import Home from "../pages/core/Home";
import Shop from "../pages/core/Shop";
import Cart from "../pages/core/Cart";
import Product from "../pages/core/product";

// Auth components
import SignUp from "../pages/auth/Signup";
import SignIn from "../pages/auth/Signin";
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";

// User components
import UserDashboard from "../pages/user/UserDashboard";
import Profile from "../pages/user/Profile";

// Admin components
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddCategory from "../pages/admin/AddCategory";
import AddProduct from "../pages/admin/AddProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import ManageProducts from "../pages/admin/ManageProducts";
import Order from "../pages/admin/Order";

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoute path="/admin/create/category" exact component={AddCategory} />
      <AdminRoute path="/admin/create/product" exact component={AddProduct} />
      <AdminRoute
        path="/admin/product/update/:productId"
        exact
        component={UpdateProduct}
      />
      <AdminRoute path="/admin/orders" exact component={Order} />
      <AdminRoute path="/admin/products" exact component={ManageProducts} />
      <Route path="/product/:productId" exact component={Product} />
      <PrivateRoute path="/profile/:userId" exact component={Profile} />
      <Route path="/cart" exact component={Cart} />
    </Switch>
  </BrowserRouter>
);

export default routes;
