import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import cv from "@techstark/opencv-js";
import { Button, Col, FloatButton, Row, Space, Upload } from "antd";
import { InferenceSession, Tensor } from "onnxruntime-web";
import React, { useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { File, Logo } from "./assets";
import { About } from "./components/about/About";
import { FooterComponent } from "./components/footer/Footer";
import Gap from "./components/gap/Gap";
import Loader from "./components/loader/LoaderComponent";
import "./style/App.css";
import { detectImage } from "./utils/detect";

const App = () => {
  const { Dragger } = Upload;

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState("Loading OpenCV.js...");
  const [image, setImage] = useState(null);
  const [totalShrimp, setTotalShrimp] = useState(0);

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // Configs
  const modelName = "shrimp_yolov8_300.onnx";
  const modelInputShape = [1, 3, 800, 800];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.2;

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    // create session
    setLoading("Loading YOLOv8 model...");
    const [yolov8, nms] = await Promise.all([
      InferenceSession.create(`${process.env.PUBLIC_URL}/model/${modelName}`),
      InferenceSession.create(
        `${process.env.PUBLIC_URL}/model/nms-yolov8.onnx`
      ),
    ]);

    // warmup main model
    setLoading("Warming up model...");
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov8.run({ images: tensor });

    setSession({ net: yolov8, nms: nms });
    setLoading(null);
  };

  // Upload and detect image
  const handleUpload = (file) => {
    // handle next image to detect
    if (image) {
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      URL.revokeObjectURL(image);
      setImage(null);
    }

    const url = URL.createObjectURL(file.file.originFileObj); // create image url
    imageRef.current.src = url; // set image source
    setImage(url);
  };

  // Load image and run detection
  const onLoadImage = async () => {
    setTotalShrimp(
      await detectImage(
        imageRef.current,
        canvasRef.current,
        session,
        topk,
        iouThreshold,
        scoreThreshold,
        modelInputShape
      )
    );
  };

  return (
    <>
      <div className="App">
        {loading ? <Loader>{loading}</Loader> : null}
        <div className="header">
          <Row align="middle" gutter={10}>
            <Col>
              <img src={Logo} style={{ width: "55px" }} alt="logo" />
            </Col>
            <Col>
              <Typewriter
                options={{
                  strings: "Welcome to",
                  autoStart: true,
                  loop: true,
                }}
              />

              <h1>Shrimp Detector App</h1>
            </Col>
          </Row>

          <Gap height={20} />
          <div className="card-feature">
            <div>Running Model:</div>
            <Gap height={10} />
            <code className="code">{modelName}</code>
          </div>
        </div>

        <div className="card-bg">
          <div className="divider"></div>
          <Gap height={20} />

          <div style={{ display: image ? "block" : "none" }}>
            <div className="content">
              <img ref={imageRef} src="#" alt="content" onLoad={onLoadImage} />
              <canvas
                id="canvas"
                width={modelInputShape[2]}
                height={modelInputShape[3]}
                ref={canvasRef}
              />
            </div>
            <Gap height={20} />
            <div className="card-content">
              Total Shrimp Found: <code className="code">{totalShrimp}</code>
            </div>
          </div>

          {!image && (
            <Dragger
              style={{ padding: "20px" }}
              onChange={handleUpload}
              showUploadList={false}
              maxCount={1}
              customRequest={() => {}}
            >
              <p className="ant-upload-drag-icon">
                <img src={File} style={{ width: "200px" }} alt="file-icon" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload your local image
              </p>
              <p className="ant-upload-hint">
                Your image will be detected using our deep learning
              </p>
            </Dragger>
          )}

          {image && (
            <>
              <Gap height={10} />

              <Space align="center">
                <Upload
                  showUploadList={false}
                  name="file"
                  maxCount={1}
                  customRequest={() => {}}
                  onChange={handleUpload}
                >
                  <Button icon={<UploadOutlined />} type="primary">
                    Change Image
                  </Button>
                </Upload>
                <Button
                  icon={<CloseCircleOutlined />}
                  type="primary"
                  danger
                  onClick={() => {
                    imageRef.current.src = "#";
                    URL.revokeObjectURL(image);
                    setImage(null);
                    setTotalShrimp(0);
                    const context = canvasRef.current.getContext("2d");
                    context.clearRect(
                      0,
                      0,
                      context.canvas.width,
                      context.canvas.height
                    );
                  }}
                >
                  Close Image
                </Button>
              </Space>
            </>
          )}
          <Gap height={20} />
          <About />
          <FloatButton.BackTop />
          <Gap height={20} />
        </div>
      </div>
      {!loading && <FooterComponent />}
    </>
  );
};

export default App;
