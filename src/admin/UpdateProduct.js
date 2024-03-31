import React, { useEffect, useState } from "react";
import { getOneProduct } from "../core/helper/coreapicalls";
import { getAllCategory, updateOneProduct } from "./helper/adminapicalls";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";

const UpdateProduct = ({ match }) => {
  const { user, token } = useSelector((state) => state.auth.user);
  const productId = match.params.productId;
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    success: false,
    loading: false,
    error: "",
    formData: "",
  });
  const { name, price, stock, description, category, success, formData } =
    values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllCategory()
      .then((data) => {
        if (data?.error) setValues({ ...values, error: data.error });
        else setCategories(data);
      })
      .catch((err) => console.log(err));
    getOneProduct(productId)
      .then((product) => {
        if (product?.error)
          setValues({ ...values, error: product.error, loading: false });
        else
          setValues({
            ...values,
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            category: product.category._id,
            formData: new FormData(),
            loading: false,
          });
      })
      .catch((err) => console.log(err));
  };

  const productUpdationSuccess = () => (
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
                Your Product {name} Has been Updated!
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setValues({ ...values, success: false })}
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
    setValues((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    updateOneProduct(user._id, token, productId, formData)
      .then((data) => {
        if (data?.error)
          setValues({ ...values, error: data.error, loading: false });
        else setValues({ ...values, success: true, loading: false });
      })
      .catch((err) => console.log(err));
  };

  const productForm = () => (
    <form className="form-group product-form mb-5">
      <input
        name="name"
        type="text"
        className="form-control"
        placeholder="Product Name"
        onChange={handleChange}
        value={name}
        required
        autoFocus
      />
      <input
        name="price"
        type="number"
        className="form-control"
        placeholder="Price in $"
        value={price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        className="form-control"
        placeholder="Product in Stock"
        value={stock}
        onChange={handleChange}
        required
      />
      {/* <input type="file" className="form-control" required /> */}
      <select
        name="category"
        className="form-control mb-4"
        onChange={handleChange}
        value={category}
        required
      >
        <option value="">--Select a Category--</option>
        {categories &&
          categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
      </select>
      <input
        name="description"
        type="textarea"
        className="form-control textarea"
        placeholder="Describe your Product"
        value={description}
        onChange={handleChange}
      />
      <button
        className="mt-4 px-4 py-2 rounded bg-success text-white shadow-lg border-0"
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );

  return (
    <AdminDashboard>
      <h3 className="admin-heading my-5 text-center">Add a Product</h3>
      {productForm()}
      {success && productUpdationSuccess()}
    </AdminDashboard>
  );
};

export default UpdateProduct;
