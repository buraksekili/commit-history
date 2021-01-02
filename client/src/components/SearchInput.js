import { Input } from "antd";
import React from "react";

const SearchInput = ({ setFilterTerm }) => {
  return (
    <Input
      onChange={(e) => setFilterTerm(e.target.value)}
      placeholder="Search commit"
    />
  );
};

export default SearchInput;
