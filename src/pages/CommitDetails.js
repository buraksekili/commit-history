import { useQuery } from "@apollo/client";
import React from "react";
import CommitDetail from "../components/CommitDetail";
import Errors from "../components/Errors";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMIT_DETAIL } from "../graphql/queries";

const CommitDetails = ({ oid }) => {
  const { data, loading, error } = useQuery(GET_COMMIT_DETAIL, {
    variables: { oid },
  });
  if (error) {
    return <Errors error={error.message}>{error.message}</Errors>;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {data ? (
        <CommitDetail commit={data.repository.ref.repository.object} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default CommitDetails;
