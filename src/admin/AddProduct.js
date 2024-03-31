import React, { useEffect, useState, useRef } from "react";
import AdminDashboard from "./AdminDashboard";
import { createProduct, getAllCategory } from "./helper/adminapicalls";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { token, user } = useSelector((state) => state.auth.user);

  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const inputNameRef = useRef("");
  const inputPriceRef = useRef("");
  const descriptionRef = useRef("");
  const stockRef = useRef("");
  const categoryRef = useRef("");
  const imageRef = useRef(null);

  useEffect(() => {
    getAllCategory()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputNameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("price", inputPriceRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("picture", imageRef.current.files[0]);

    createProduct(user._id, token, formData)
      .then((data) => {
        if (data?.error) console.log("Product backend:", data.error);
        else {
          setSuccess(true);
          console.log(data);
        }
      })
      .catch((err) => console.log("promise err", err));
  };

  const productCreateSuccess = () => (
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
              <h5 className="modal-title">Product Added To Store</h5>
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

  const productForm = () => (
    <form className="form-group product-form mb-5">
      <input
        type="text"
        ref={inputNameRef}
        className="form-control"
        placeholder="Product Name"
        required
        autoFocus
      />
      <input
        type="number"
        ref={inputPriceRef}
        className="form-control"
        placeholder="Price in $"
        required
      />
      <input
        ref={stockRef}
        type="number"
        className="form-control"
        placeholder="Product in Stock"
        required
      />
      <input type="file" className="form-control" ref={imageRef} required />
      <select className="form-control mb-4" ref={categoryRef} required>
        <option value="">--Select a Category--</option>
        {categories &&
          categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
      </select>
      <input
        type="textarea"
        ref={descriptionRef}
        className="form-control textarea"
        placeholder="Describe your Product"
      />
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
      <h3 className="admin-heading my-5 text-center">Add a Product</h3>
      {productForm()}
      {success && productCreateSuccess()}
    </AdminDashboard>
  );
};

export default AddProduct;
