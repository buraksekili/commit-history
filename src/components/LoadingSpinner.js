import { Row, Spin } from "antd";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Row justify="center" align="middle" wrap style={{ height: "inherit" }}>
      <Spin
        spinning={true}
        size="large"
        style={{ verticalAlign: "middle" }}
      ></Spin>
    </Row>
  );
};

export default LoadingSpinner;
