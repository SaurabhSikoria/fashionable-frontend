import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../features/authSlice";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Base from "./Base";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [values, setValues] = useState({
    email: "admin@gmail.com",
    password: "123456",
    error: "",
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    dispatch(signin({ email, password }))
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, didRedirect: true });
        }
      })
      .catch((err) => console.log("SignIn Failed!", err));
  };

  const onRedirect = () => {
    if (didRedirect) {
      if (user?.user?.role === 1) {
        return <Redirect to="/admin/admindashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    } else return null;
  };

  return (
    <Base>
      <div className="container">
        <form>
          <div className="field mb-4">
            <span className="bx bxs-envelope"></span>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="field mb-4  ">
            <span className="bx bxs-lock-alt"></span>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-check mb-5">
            <label className="form-check-label">
              <input
                type="checkbox"
                name="remember"
                className="form-check-input"
              />{" "}
              Remember me
            </label>
          </div>
          <button type="submit" className="signin-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <h4>
          Not a member? <Link to="/signup">Signup Here</Link>
        </h4>
        {onRedirect()}
      </div>
    </Base>
  );
};

export default Signin;
