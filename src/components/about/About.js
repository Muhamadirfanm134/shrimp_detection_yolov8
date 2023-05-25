import { Divider } from "antd";
import React from "react";
import "../../style/App.css";
import "./about.css";

export const About = () => {
  return (
    <div className="about-wrapper">
      <Divider orientation="left">About This App</Divider>

      <p style={{ margin: "0 10px", textAlign: "justify", fontSize: "12px" }}>
        This App was built to detect shrimp using onnxruntime-web and YOLOv8.
        The dataset was trained using yolov8 on Google Colab on 300 epochs for
        about 7.5 hours. The datasets have a total of 6630 images.
      </p>

      <p></p>
    </div>
  );
};
