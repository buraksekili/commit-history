import { useQuery } from "@apollo/client";
import { Avatar, List } from "antd";
import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
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
  });

  const handleNextPagination = (e) => {
    e.preventDefault();
    console.log(data.getCommits);
    refetch({
      number,
      cursor: data.getCommits.endCursor,
      after: true,
    });
  };

  const handlePrevPagination = (e) => {
    e.preventDefault();
    console.log(data.getCommits);
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
        <LoadingSpinner />
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
                  title={commit.messageHeadline}
                  description={commit.message}
                />
                <List.Item.Meta description={commit.message} />
                <p>Hash: {commit.abbreviatedOid}</p>
                <p>Parent Hash:{commit.abbreviatedOid}</p>
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
