// BaseComponent.jsx
import React from "react";
import { Link } from "react-router-dom"; // If you plan to use React Router for navigation
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div className="container-fluid p-0">
      <header className="bg-dark shadow-lg text-light px-3">
        <nav className="navbar navbar-components navbar-expand-lg px-4">
          <Link to="/" className="logo navbar-brand py-0">
            Fashionables
          </Link>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <Menu />
          </div>
        </nav>
      </header>

      {children}
      <div className="footer-container">
        <footer className="footer bg-dark text-light py-4">
          <div className="row">
            <div className="col-md-6">
              <h4>Contact Us</h4>
              <p>Email: your.email@example.com</p>
            </div>
            <div className="col-md-6">
              <h4>Follow Us</h4>
              <div className="social-links">
                <div className="social-link me-2">Facebook</div>
                <div className="social-link me-2">Twitter</div>
                <div className="social-link me-2">Instagram</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Base;
