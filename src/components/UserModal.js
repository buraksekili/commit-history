import { Avatar, Button, Col, Modal, Row, Typography } from "antd";
import React from "react";
const { Paragraph, Link } = Typography;

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
          closable
          key={4}
          title={`${author.name} profile`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button type="primary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <Row align="middle" justify="space-around">
            <Col>
              <Avatar size={responsiveSize} src={author.avatarUrl} />
            </Col>
            <Col span={16}>
              <Row align="middle" justify="center" wrap={true}>
                <Link href={author.user.url} target="_blank">
                  {`${author.user.login} / ${author.name}`}
                </Link>
              </Row>

              <Row align="middle" justify="center" wrap={true}>
                <Paragraph style={{ marginBottom: 3 }}>
                  {author.user.bio}
                </Paragraph>
              </Row>
              <Row align="middle" justify="center" wrap={true}>
                <Paragraph type="secondary">{author.user.location}</Paragraph>
              </Row>
              <Row align="middle" justify="center" wrap={true}>
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
