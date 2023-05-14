import React from "react";
import { Layout, Row, Col, Button } from "antd";
import "./footer.css";

export const FooterComponent = () => {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <div>
        <b>Build Proudly By: </b>
      </div>
      <Row align="middle" gutter={10}>
        <Col>
          <div>Muhamad Irfan Maulana @2023 | </div>
        </Col>
        <Col>
          <Button
            className="primaryButton"
            size="small"
            shape="circle"
            style={{ marginRight: 5 }}
            icon={<i className="bx bx-fw bxl-linkedin" />}
            href="https://www.linkedin.com/in/muhamadirfanm134/"
            target="_blank"
          />
          <Button
            className="primaryButton"
            size="small"
            shape="circle"
            icon={<i className="bx bx-fw bxl-github" />}
            href="https://github.com/Muhamadirfanm134"
            target="_blank"
          />
        </Col>
      </Row>
    </Footer>
  );
};
