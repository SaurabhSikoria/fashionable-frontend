import React from "react";
import Base from "../core/Base";
import { useDispatch, useSelector } from "react-redux";
import { setOrdersState, setProfile } from "../features/submenuSlice";
import { withRouter } from "react-router-dom";

const UserDashboard = ({ history, children }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.submenu.profile);
  const orders = useSelector((state) => state.submenu.orders);
  const { user } = useSelector((state) => state.auth.user);

  return (
    <Base>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 text-center mt-5 user-side-menu">
            <h4
              className={`menu-item text-dark mb-2 ${profile ? "active" : ""}`}
              onClick={() => {
                dispatch(setProfile());
                history.push(`/user/profile/${user._id}`);
              }}
            >
              Profile
            </h4>
            <h4
              className={`menu-item text-dark mb-2 ${orders ? "active" : ""}`}
              onClick={() => {
                dispatch(setOrdersState());
                history.push(`/user/orders/${user._id}`);
              }}
            >
              Orders
            </h4>
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </Base>
  );
};

export default withRouter(UserDashboard);
