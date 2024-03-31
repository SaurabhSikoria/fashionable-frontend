import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { getAllCategory, removeCategory } from "./helper/adminapicalls";
import { useSelector } from "react-redux";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const authenticate = useSelector((state) => state.auth.user);
  const { token, user } = authenticate;
  const [success, setSuccess] = useState(false);

  const preload = () => {
    getAllCategory()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else setCategories(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const removingCategory = (id) => {
    removeCategory(user._id, token, id).then((data) => {
      if (data?.error) console.log(data.error);
      else {
        setSuccess(true);
        preload();
      }
    });
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
              <h5 className="modal-title">This Category has been Deleted</h5>
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
      <h3 className="admin-heading my-5 text-center">MANAGE YOUR CATEGORIES</h3>
      <ul className="all-category">
        {categories &&
          categories.map((category, index) => (
            <li
              className="show-category form-group d-flex justify-content-between px-3 py-2 my-3 rounded"
              key={index}
            >
              <h6>{category.name}</h6>
              <div className="category-option">
                <span
                  className="manage-category edit-category bx bx-edit mx-4"
                  // onClick={() => setSuccess(!success)}
                ></span>
                <span
                  className="manage-category delete-category bx bx-trash mx-4"
                  onClick={() => removingCategory(category._id)}
                ></span>
              </div>
            </li>
          ))}
      </ul>
      {success && deletionSuccess()}
    </AdminDashboard>
  );
};

export default ManageCategory;
