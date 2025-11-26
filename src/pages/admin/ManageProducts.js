import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { isAuthenticate } from "../../services/AuthService";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/AdminService";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticate();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total Products: {products.length}</h2>
          <hr />
          <ul className="list-group">
            {products.map((product, i) => (
              <li
                key={i}
                className="list-group-item"
                style={{ textAlign: "center" }}
              >
                <h3>{product.name}</h3>
                <Link
                  to={`/admin/product/update/${product._id}`}
                  className="mr-3"
                >
                  <span>Update</span>
                </Link>
                <span
                  onClick={() => destroy(product._id)}
                  style={{ cursor: "pointer", color: "orange" }}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
