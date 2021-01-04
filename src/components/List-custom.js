import { Avatar, Col, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserModal from "./UserModal";

const responsiveSize = {
  xs: 44,
  sm: 52,
  md: 60,
  lg: 68,
  xl: 76,
  xxl: 84,
};
let currentPage = 1;

const ListCustom = ({
  data,
  refetch,
  filterTerm,
  number,
  loading,
  setNumber,
}) => {
  const [commitsCount] = useState(data.totalCount);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const [commits, setCommits] = useState(data.edges);

  useEffect(() => {
    setCommits(data.edges);
  }, [data]);

  useEffect(() => {
    if (commits) {
      const result = data.edges
        .filter((commit) => {
          if (filterTerm === "") {
            return commit;
          }
          if (
            commit.node.messageHeadline
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
          <List
            loading={loading}
            dataSource={commits}
            column={1}
            itemLayout="vertical"
            pagination={{
              pageSize: number,
              current: currentPage,
              total: commitsCount,
              showQuickJumper: false,
              showSizeChanger: false,
              onChange: (page, pageSize) => {
                currentPage = page;
                const oid = data.pageInfo.endCursor.split(" ")[0];
                refetch({
                  variables: {
                    last: pageSize,
                    cursor: oid + " " + page * pageSize,
                    first: undefined,
                  },
                });
              },
            }}
            renderItem={(commit) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={responsiveSize}
                      src={commit.node.author.avatarUrl}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAuthor(commit.node.author);
                        showModal();
                      }}
                    />
                  }
                  title={
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Link to={`/commit/${commit.node.oid}`}>
                          {commit.node.messageHeadline}
                        </Link>
                      </Col>
                      <Col>Hash: {commit.node.abbreviatedOid}</Col>
                    </Row>
                  }
                  description={commit.node.message}
                />
                {commit.node.parents && (
                  <List.Item.Meta
                    description={` Parent Hash: ${commit.node.parents.nodes[0].abbreviatedOid}`}
                  />
                )}
              </List.Item>
            )}
          />

          <UserModal
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            author={author}
          />
        </>
      )}
    </div>
  );
};

export default ListCustom;
