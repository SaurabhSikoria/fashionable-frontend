import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { step: 1, label: "Order Placed" },
    { step: 2, label: "Shipped" },
    { step: 3, label: "Out For Delivery" },
    { step: 4, label: "Delivered" },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center">
      <ul
        className="list-inline d-flex justify-content-between p-2 bg-white rounded shadow"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        {steps.map(({ step, label }) => (
          <li
            key={step}
            className="list-inline-item text-center"
            style={{ minWidth: "170px", position: "relative" }}
          >
            <div
              className={`rounded-circle d-flex justify-content-center align-items-center ${
                currentStep >= step
                  ? "bg-primary text-white"
                  : "bg-light text-muted"
              }`}
              style={{
                width: "40px",
                height: "40px",
                margin: "0 auto",
                zIndex: 10,
              }}
            >
              {step}
            </div>
            <div style={{ marginTop: "10px", fontWeight: "500" }}>{label}</div>
            {step !== steps.length && (
              <div
                style={{
                  position: "absolute",
                  top: "19px",
                  left: "50%",
                  width: "100%",
                  height: "2px",
                  backgroundColor:
                    currentStep >= step + 1 ? "aqua" : "lightgray",
                  zIndex: -1,
                  transform: "translateX(-50%)",
                }}
              ></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
