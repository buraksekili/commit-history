import { Avatar, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileInformation from "./FileInformation";
import UserModal from "./UserModal";
const { Text, Title, Paragraph, Link } = Typography;

const responsiveSize = {
  xs: 56,
  sm: 64,
  md: 72,
  lg: 80,
  xl: 88,
  xxl: 96,
};

const styles = {
  fontSize: "1.5em",
  padding: "0.3em",
};

const CommitDetail = ({ commit }) => {
  const {
    additions,
    author,
    commitUrl,
    deletions,
    message,
    messageHeadline,
    pushedDate,
  } = commit;
  const [files, setFiles] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await axios.get(
          `https://api.github.com/repos/facebook/react/commits/${commit.oid}`
        );
        setFiles(result.data.files);
      } catch (e) {
        setFiles(undefined);
      }
    };
    fetchFiles();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {author && (
        <>
          <Row align="middle" justify="center" style={styles}>
            <Col flex={1}>
              <Row justify="center">
                <Title>
                  <Link href={commitUrl} target="_blank">
                    {messageHeadline}
                  </Link>
                </Title>
              </Row>
              <Row justify="center" gutter={[10]}>
                <Avatar
                  size={responsiveSize}
                  src={author.avatarUrl}
                  style={{ cursor: "pointer" }}
                  onClick={showModal}
                />
              </Row>
              <Row justify="center">
                <Text strong>
                  {author.name} - {author.email}
                </Text>
              </Row>
              <Row justify="center">
                <Text strong> {pushedDate} </Text>
              </Row>

              <Row justify="center">
                <Text strong type="success">
                  {additions} additions
                </Text>
              </Row>
              <Row justify="center">
                <Text strong type="danger">
                  {deletions} deletions
                </Text>
              </Row>
              <Row justify="center">
                <Text strong mark>
                  {files && files.length} files edited
                </Text>
              </Row>
            </Col>
            <Divider />
            <Row typeof="flex" align="center">
              <Paragraph>{message}</Paragraph>
            </Row>
            <Divider />
          </Row>

          {files && (
            <Col flex={1}>
              <Text style={{ ...styles, padding: "1em" }}>
                Edited File List
              </Text>
              {files.map((file, i) => (
                <FileInformation key={i} file={file} />
              ))}
            </Col>
          )}
          <UserModal
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            author={author}
          />
        </>
      )}
    </>
  );
};

export default CommitDetail;
