import { useQuery } from "@apollo/client";
import React from "react";
import CommitDetail from "../components/CommitDetail";
import Errors from "../components/Errors";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMIT_DETAILS } from "../graphql/queries";

const CommitDetails = ({ oid }) => {
  const { data, loading, error } = useQuery(GET_COMMIT_DETAILS, {
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
      {data && data.getCommitDetail ? (
        <CommitDetail
          commit={data.getCommitDetail}
          files={data.getCommitDetail.files}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default CommitDetails;
