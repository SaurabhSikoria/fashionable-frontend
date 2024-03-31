import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { removeProduct } from "./helper/adminapicalls";
import { getAllProducts } from "../core/helper/coreapicalls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);

  const authuser = useSelector((state) => state.auth.user);
  const { token, user } = authuser;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const removingProduct = (id) => {
    removeProduct(user._id, token, id)
      .then((data) => {
        if (data?.error) console.log(data.error);
        else {
          setSuccess(true);
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  const deletionSuccess = () => (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Your Product Has been Deleted</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );

  return (
    <AdminDashboard>
      <h3 className="admin-heading my-5 text-center">MANAGE YOUR Products</h3>
      <ul className="all-product">
        {products &&
          products.map((product, index) => (
            <li
              className="show-product form-group d-flex justify-content-between px-3 py-2 my-3 rounded"
              key={index}
            >
              <h6>{product.name}</h6>
              <div className="product-option">
                <Link to={`/product/update/${product._id}`}>
                  <span className="manage-product edit-product bx bx-edit mx-4"></span>
                </Link>
                <span
                  className="manage-product delete-product bx bx-trash mx-4"
                  onClick={() => removingProduct(product._id)}
                ></span>
              </div>
            </li>
          ))}
      </ul>
      {success && deletionSuccess()}
    </AdminDashboard>
  );
};

export default ManageProduct;
