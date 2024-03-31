import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleCategoryMenu,
  toggleProductMenu,
} from "../features/submenuSlice";

const AdminMenu = ({ history }) => {
  const dispatch = useDispatch();
  const categoryMenu = useSelector((state) => state.submenu.categoryMenu);
  const productMenu = useSelector((state) => state.submenu.productMenu);

  const currentTab = (history, path) => {
    if (history.location.pathname === path) return { color: "#FFC107" };
    else return { color: "#000" };
  };

  return (
    <div className="col-sm-2 sidebar pt-4 pe-0">
      <h4
        className={`menu-item mb-2 ${categoryMenu ? "active" : ""}`}
        onClick={() => dispatch(toggleCategoryMenu())}
      >
        Category
      </h4>
      {categoryMenu && (
        <div className={`submenu`}>
          <h5
            style={currentTab(history, "/category/create")}
            className="submenu-item py-1"
            onClick={() => history.push("/category/create")}
          >
            Create
          </h5>
          <h5
            style={currentTab(history, "/category/manage")}
            className="submenu-item mb-2"
            onClick={() => history.push("/category/manage")}
          >
            Manage
          </h5>
        </div>
      )}
      <h4
        className={`menu-item mb-2 ${productMenu ? "active" : ""}`}
        onClick={() => dispatch(toggleProductMenu())}
      >
        Products
      </h4>
      {productMenu && (
        <div className={`submenu`}>
          <h5
            style={currentTab(history, "/product/create")}
            className="submenu-item py-1"
            onClick={() => history.push("/product/create")}
          >
            Create
          </h5>
          <h5
            style={currentTab(history, "/product/manage")}
            className="submenu-item mb-2"
            onClick={() => history.push("/product/manage")}
          >
            Manage
          </h5>
        </div>
      )}
      <h4
        style={currentTab(history, "/category/delete")}
        className="menu-item mb-2"
        onClick={() => history.push("/category/delete")}
      >
        Settings
        <span className="bx bxs-brightness ms-3"></span>
      </h4>
    </div>
  );
};

export default withRouter(AdminMenu);
