import { InputNumber, Row } from "antd";
import React from "react";

const NumberSlider = ({ number, setNumber }) => {
  return (
    <Row align="middle" justify="center">
      <h4 style={{ textAlign: "center", margin: 0 }}>The number of commits:</h4>
      <InputNumber
        min={2}
        max={20}
        style={{ margin: "0 16px" }}
        value={number}
        onChange={(val) => setNumber(val)}
      />
    </Row>
  );
};

export default NumberSlider;
