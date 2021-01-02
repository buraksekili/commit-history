import { Avatar, Col, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationButtons from "./PaginationButtons";
import NumberSlider from "./Slider";
import UserModal from "./UserModal";

const responsiveSize = {
  xs: 44,
  sm: 52,
  md: 60,
  lg: 68,
  xl: 76,
  xxl: 84,
};

const ListCustom = ({ data, refetch, filterTerm, number, setNumber }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const [commits, setCommits] = useState(data.getCommits.commits);

  useEffect(() => {
    setCommits(data.getCommits.commits);
  }, [data]);

  useEffect(() => {
    if (commits) {
      const result = data.getCommits.commits
        .filter((commit) => {
          if (filterTerm === "") {
            return commit;
          }
          if (
            commit.messageHeadline
              .toLowerCase()
              .includes(filterTerm.toLowerCase())
          ) {
            return commit;
          }
        })
        .slice((val) => val);
      setCommits(result);
    }
  }, [filterTerm]);

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
    <div>
      {commits && (
        <>
          <NumberSlider number={number} setNumber={setNumber} />
          <List
            column={1}
            itemLayout="vertical"
            size="large"
            dataSource={commits}
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
    </div>
  );
};

export default ListCustom;
