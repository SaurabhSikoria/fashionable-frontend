import React from "react";

const ErrorComponent = () => {
  throw new Error("This is a test error for ErrorBoundary.");
  return <div>This should not render.</div>;
};

export default ErrorComponent;
