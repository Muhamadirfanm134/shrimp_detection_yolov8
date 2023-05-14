import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.css";
import { ConfigProvider } from "antd";
import { ThemeConfig } from "./themes/themeConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={ThemeConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
