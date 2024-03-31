import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../features/authSlice";

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const firstname = firstNameRef.current.value;
    const lastname = lastNameRef.current.value;
    const password = passwordRef.current.value;

    signup({ firstname, lastname, email, password })
      .then((data) => {
        if (data?.error) console.log("Invalid Form Attempt: ", data.error);
        else {
          setSuccess(true);
          setMessage(data.msg);
        }
      })
      .catch((err) => console.log("Signup Error: ", err));
  };

  const signupSuccess = () => (
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
              <h5 className="modal-title">WELCOME TO FASHIONABLES</h5>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <Link to="signin" className="btn btn-primary">
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );

  return (
    <div className="container">
      <form className="signup" action="#">
        <div className="name d-flex">
          <div className="field mb-4 me-2">
            <span></span>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              ref={firstNameRef}
            />
          </div>
          <div className="field mb-4 ms-2">
            <span></span>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              ref={lastNameRef}
            />
          </div>
        </div>
        <div className="field mb-4">
          <span></span>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </div>
        <div className="field mb-4  ">
          <span></span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
        {/* <div className="field mb-4  ">
          <span></span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
          />
        </div> */}
        {/* <div className="form-check mb-4 ms-2">
          <label className="form-check-label">
            <input
              type="checkbox"
              name="remember"
              className="form-check-input"
            />{" "}
            Remember me
          </label>
        </div> */}
        <button type="submit" className="signin-btn" onClick={onSubmit}>
          Submit
        </button>
      </form>
      <h4>
        Already a member? <Link to="/signin">Login Here</Link>
      </h4>
      {success && signupSuccess()}
    </div>
  );
};

export default Signup;
