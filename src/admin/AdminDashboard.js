import React, { useState } from "react";
import Base from "../core/Base";
import AdminMenu from "./AdminMenu";

const AdminDashboard = ({ children }) => {
  return (
    <Base>
      <div className="container-fluid adminDashboard">
        <div className="row">
          <AdminMenu />
          <div className="col-sm-10 px-4">{children}</div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
