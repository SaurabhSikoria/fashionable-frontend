import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from "./ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ErrorBoundary>
);
