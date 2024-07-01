import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "./helper/ProgressBar";
import { useSelector } from "react-redux";

const ViewOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const { user } = useSelector((state) => state.auth.user);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    switch (order.status) {
      case "Recieved":
        setCurrentStep(1);
        break;
      case "Shipped":
        setCurrentStep(2);
        break;
      case "To_be_delivered":
        setCurrentStep(3);
        break;
      case "Delievered":
        setCurrentStep(4);
        break;
      default:
        setCurrentStep(0);
    }
  }, [order]);

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <div className="container-fluid order-details my-3 d-flex justify-content-between ">
        <div className="delivery-address p-3">
          <h6 className="mb-3">Delivery Address</h6>
          <h6>{user.firstName}</h6>
          <p>720 Nai basti, chand gate, Near shiv mandir</p>
          <p>Jhansi - 284002, Uttar Pradesh</p>
          <p>Phone number 9823984299</p>
        </div>
        <div className="order-options p-3 text-center">
          <h6 className="mb-3">More actions</h6>
          <a className="btn btn-outline-primary mb-2 d-block">
            Download Invoice
          </a>
          <a className="btn btn-outline-warning d-block">Report Issue</a>
        </div>
      </div>
      <div className="container-fluid">
        <ProgressBar currentStep={currentStep} />
      </div>
    </div>
  );
};

export default ViewOrder;
