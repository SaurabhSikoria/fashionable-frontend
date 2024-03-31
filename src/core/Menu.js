import React from "react";
import { withRouter, Link } from "react-router-dom";
import { signout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Menu = ({ history }) => {
  let user = null;
  let token = "";

  const currentTab = (history, path) => {
    if (history.location.pathname === path) return { color: "#9EEBFD" };
    else return { color: "#fff" };
  };

  const userInfo = useSelector((state) => state.auth.user);
  if (userInfo) {
    const { user: authuser, token: authtoken } = userInfo;
    user = authuser;
    token = authtoken;
  }

  const dispatch = useDispatch();

  return (
    <>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            to="/"
            className="nav-link  mx-3"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/category/create")}
            to="/category/create"
            className="nav-link mx-3"
          >
            About
          </Link>
        </li>
        {!userInfo ? (
          <div className="userSign d-flex">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                to="/signup"
                className="nav-link mx-3"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                to="/signin"
                className="nav-link mx-3"
              >
                Sign In
              </Link>
            </li>
          </div>
        ) : (
          <div className="userSign d-flex">
            <li className="nav-item">
              <span
                style={currentTab(history, "/cart")}
                className="nav-link bx bxs-cart bx-sm cart-logo"
                onClick={() => history.push("/cart")}
              ></span>
            </li>
            <li className="nav-item">
              <div className="dropdown" data-bs-placement="left">
                <span
                  className="dropdown-toggle bx bxs-user-circle user-profile-icon ms-4 bg-secondary rounded"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></span>
                <ul
                  className="dropdown-menu dropdown-menu-end bg-secondary text-center fw-bold"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={{
                        pathname: `/user/profile/${user._id}`,
                        state: { user, token },
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/user/orders/${user._id}`}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <span
                      className="nav-link text-warning mx-3"
                      onClick={() => dispatch(signout(() => history.push("/")))}
                    >
                      Signout
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default withRouter(Menu);
