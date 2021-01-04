import { GithubFilled, GithubOutlined } from "@ant-design/icons";
import { Button, Divider, PageHeader } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import SearchInput from "./SearchInput";
import "./styles/Header.css";

const Header = ({ back, setFilterTerm }) => {
  const history = useHistory();
  return (
    <>
      {back ? (
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Commits"
          subTitle="Burak Sekili"
          extra={[
            <Button
              style={{ border: 0, backgroundColor: "transparent" }}
              href="https://github.com/buraksekili/commit-history"
              icon={<GithubFilled className="header" />}
            />,
          ]}
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title="Commits"
          subTitle="Burak Sekili"
          tags={<SearchInput setFilterTerm={setFilterTerm} />}
          extra={[
            <Button
              style={{ border: 0, backgroundColor: "transparent" }}
              href="https://github.com/buraksekili/commit-history"
              icon={<GithubOutlined className="header" />}
            />,
          ]}
        />
      )}
      <Divider />
    </>
  );
};

export default Header;
