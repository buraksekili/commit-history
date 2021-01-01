import { useQuery } from "@apollo/client";
import React from "react";
import Commit from "../components/Commit";
import LoadingSpinner from "../components/LoadingSpinner";
import { GET_COMMIT_DETAILS } from "../graphql/queries";

const CommitDetails = ({ oid }) => {
  const { data } = useQuery(GET_COMMIT_DETAILS, {
    variables: { oid },
  });

  return (
    <>
      {data && data.getCommitDetail ? (
        <Commit
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
