import { useQuery } from "@apollo/client";
import React from "react";
import CommitDetail from "../components/CommitDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMIT_DETAILS } from "../graphql/queries";

const CommitDetails = ({ oid }) => {
  const { data } = useQuery(GET_COMMIT_DETAILS, {
    variables: { oid },
  });

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
