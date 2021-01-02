import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import ListCustom from "../components/List-custom";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMITS } from "../graphql/queries";

const Home = ({ filterTerm }) => {
  const [number, setNumber] = useState(5);

  const { loading, data, refetch } = useQuery(GET_COMMITS, {
    variables: { number: number, cursor: undefined, after: true },
    fetchPolicy: "no-cache",
  });

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    refetch({
      number,
      cursor: data.getCommits.startCursor,
      after: false,
    });
  }, [number]);

  if (!data || loading) {
    return <LoadingSpinner />;
  }

  return (
    <ListCustom
      data={data}
      refetch={refetch}
      filterTerm={filterTerm}
      number={number}
      setNumber={setNumber}
    />
  );
};

export default Home;
