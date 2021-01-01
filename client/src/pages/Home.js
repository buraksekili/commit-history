import { useQuery } from "@apollo/client";
import { Avatar, Col, List, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PaginationButtons from "../components/PaginationButtons";
import UserModal from "../components/UserModal";
import { GET_COMMITS } from "../graphql/queries";

const responsiveSize = {
  xs: 44,
  sm: 52,
  md: 60,
  lg: 68,
  xl: 76,
  xxl: 84,
};

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const [number, setNumber] = useState(5);
  const { loading, data, refetch } = useQuery(GET_COMMITS, {
    variables: { number: 5, cursor: undefined, after: true },
    fetchPolicy: "network-only",
  });

  const handleNextPagination = (e) => {
    e.preventDefault();
    refetch({
      number,
      cursor: data.getCommits.endCursor,
      after: true,
    });
  };

  const handlePrevPagination = (e) => {
    e.preventDefault();
    if (
      data.getCommits.startCursor.endsWith("1") ||
      !data.getCommits.hasPreviousPage
    ) {
      return;
    }
    refetch({
      number,
      cursor: data.getCommits.startCursor,
      after: false,
    });
  };

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
      {loading ? (
        console.log("loading")
      ) : (
        <>
          <List
            column={1}
            itemLayout="vertical"
            size="large"
            loading={loading}
            dataSource={data.getCommits.commits}
            renderItem={(commit) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={responsiveSize}
                      src={commit.author.avatarUrl}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAuthor(commit.author);
                        showModal();
                      }}
                    />
                  }
                  title={
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Link to={`/commit/${commit.oid}`}>
                          {commit.messageHeadline}
                        </Link>
                      </Col>
                      <Col>Hash: {commit.abbreviatedOid}</Col>
                    </Row>
                  }
                  description={commit.message}
                />
                <List.Item.Meta
                  description={` Parent Hash: ${commit.parentHash}`}
                />
              </List.Item>
            )}
          />
          <UserModal
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            author={author}
          />
          <PaginationButtons
            handlePrevPagination={handlePrevPagination}
            handleNextPagination={handleNextPagination}
          />
        </>
      )}
    </>
  );
};

export default Home;
