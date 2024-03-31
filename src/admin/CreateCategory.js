import React, { useState, useEffect } from "react";
import { createCategory, getAllCategory } from "./helper/adminapicalls";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const authuser = useSelector((state) => state.auth.user);
  const { token, user } = authuser;

  useEffect(() => {
    getAllCategory()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const successMessage = () => (
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
              <h5 className="modal-title">
                Your Category {name} Has been Created!
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => window.location.reload()}
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

  const onsubmit = (e) => {
    e.preventDefault();
    if (!parentCategory) {
      createCategory(user._id, token, { name })
        .then((data) => {
          if (data.error) console.log(data.error);
          else {
            setSuccess(true);
            // setName("");
            // setParentCategory("");
          }
        })
        .catch((err) => console.log(err));
    } else
      createCategory(user._id, token, { name, parentCategory })
        .then((data) => {
          if (data.error) console.log(data.error);
          else {
            setSuccess(true);
          }
        })
        .catch((err) => console.log(err));
    // } else console.log("Select a valid Category");
  };

  const categoryForm = () => (
    <form className="form-group mt-4">
      <span>Enter the Category</span>
      <input
        type="text"
        className="form-control"
        placeholder="Eg. Shoes"
        autoFocus
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span>Select the parent Category</span>
      <select
        className="form-control"
        value={parentCategory}
        placeholder="Parent Category"
        onChange={(e) => setParentCategory(e.target.value)}
      >
        <option value="">--Select Parent Category if Needed--</option>
        {categories &&
          categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>
      <button
        className="mt-4 px-4 py-2 rounded bg-success text-white shadow-lg border-0"
        onClick={onsubmit}
      >
        Submit
      </button>
    </form>
  );

  return (
    <AdminDashboard>
      <div className="category-menu mx-4 p-2">
        <h4>Create a category</h4>
        {categoryForm()}
        {success && successMessage()}
      </div>
    </AdminDashboard>
  );
};

export default CreateCategory;
