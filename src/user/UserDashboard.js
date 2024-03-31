import React from "react";
import Base from "../core/Base";

const UserDashboard = ({ children }) => {
  return (
    <Base>
      <div className="container-fluid">
        <div className="row">
          {/* Side Menu */}
          <div className="col-md-3 bg-light">
            <h3>Side Menu</h3>
            <ul className="list-group">
              <li className="list-group-item">Option 1</li>
              <li className="list-group-item">Option 2</li>
              <li className="list-group-item">Option 3</li>
            </ul>
          </div>
          {/* Main Content */}
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashboard;
