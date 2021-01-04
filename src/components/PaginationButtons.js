import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React from "react";
import "./styles/PaginationButtons.css";

const PaginationButtons = ({ handleNextPagination, handlePrevPagination }) => {
  return (
    <Row gutter={[40, 16]} justify="center">
      <BackwardOutlined
        span={12}
        onClick={(e) => handlePrevPagination(e)}
        className="pagination-button"
      />
      <ForwardOutlined
        span={12}
        onClick={(e) => handleNextPagination(e)}
        className="pagination-button"
      />
    </Row>
  );
};

export default PaginationButtons;
