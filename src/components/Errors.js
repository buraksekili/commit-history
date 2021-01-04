import { Row, Typography } from "antd";
import React from "react";
const { Title } = Typography;

const Errors = ({ error }) => {
  return (
    <Row align="middle" justify="center">
      {error ? <Title>{error}</Title> : <Title>Error!</Title>}
    </Row>
  );
};

export default Errors;
