import React from "react";
import "../../style/loader.css";
import { Logo } from "../../assets";
import { Space } from "antd";

const Loader = (props) => {
  return (
    <div className="wrapper" {...props}>
      <Space direction="vertical">
        <div>
          <img src={Logo} style={{ width: "250px" }} alt="logo-loader" />
        </div>
        <Space>
          <div className="spinner" />
          <p>{props.children}</p>
        </Space>
      </Space>
    </div>
  );
};

export default Loader;
