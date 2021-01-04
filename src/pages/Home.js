import { NetworkStatus, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Errors from "../components/Errors";
import ListCustom from "../components/List-custom";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMITS } from "../graphql/queries";

const Home = ({ filterTerm }) => {
  const [number, setNumber] = useState(5);

  const [getCommits, { loading, data, error, networkStatus }] = useLazyQuery(
    GET_COMMITS,
    {
      variables: {
        first: number,
        cursorAfter: undefined,
        cursorBefore: undefined,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    getCommits({ variables: { number } });
  }, [number]);

  if (error && error.message.includes("401")) {
    return <Errors error={error.message} />;
  }

  if (!data || loading || networkStatus === NetworkStatus.refetch) {
    return <LoadingSpinner />;
  }

  return (
    <ListCustom
      data={data.repository.ref.target.history}
      refetch={getCommits}
      filterTerm={filterTerm}
      number={number}
      setNumber={setNumber}
      loading={loading}
    />
  );
};

export default Home;
