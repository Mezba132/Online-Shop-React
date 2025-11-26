import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Redirect } from "react-router-dom";
import {
  getUserInfo,
  updateUserInfo,
  updateUser,
} from "../../services/UserService";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, email, password, error, success } = values;

  const { token } = isAuthenticate();

  const init = (userId) => {
    getUserInfo(userId, token).then((data) => {
      if (!data) return;
      const { name, email } = data;
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: name, email: email, error: false });
      }
    });
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (!data) return;
        if (data && data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = () => success && <Redirect to="/user/dashboard" />;

  useEffect(() => {
    init(match.params.userId);
  }, []);

  return (
    <Layout
      title="Profile"
      description="Update Your Profile"
      className="container-fluid"
    >
      {/* {JSON.stringify(values)} */}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
