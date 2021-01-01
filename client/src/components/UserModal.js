import { Avatar, Col, Modal, Row, Typography } from "antd";
import React from "react";
const { Paragraph } = Typography;

const responsiveSize = {
  xs: 96,
  sm: 140,
  md: 160,
  lg: 192,
  xl: 200,
  xxl: 300,
};

const UserModal = ({ isModalVisible, handleOk, handleCancel, author }) => {
  return (
    <>
      {author && (
        <Modal
          title={`${author.name} profile`}
          visible={isModalVisible}
          onOk={handleOk}
        >
          <Row align="middle" justify="space-around">
            <Col>
              <Avatar size={responsiveSize} src={author.avatarUrl} />
            </Col>
            <Col span={12}>
              <Row align="middle" justify="start">
                <Paragraph strong>Author Name:</Paragraph>
                <Paragraph>{author.name}</Paragraph>
              </Row>
              <Row align="middle" justify="start" wrap={true}>
                <Paragraph strong>Email:</Paragraph>
                <Paragraph>{author.email}</Paragraph>
              </Row>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default UserModal;
