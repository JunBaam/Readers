import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import App from "./App";
import { AppProvider } from "./store";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      {/* 최상위 컴포넌트 App */}
      <App />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
