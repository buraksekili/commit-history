import gql from "graphql-tag";

export const GET_COMMITS = gql`
  query($cursor: String, $number: Int, $after: Boolean!) {
    getCommits(after: $after, cursor: $cursor, number: $number) {
      commits {
        messageHeadline
        message
        pushedDate
        oid
        abbreviatedOid
        parentHash
        author {
          name
          avatarUrl
          email
        }
      }
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_COMMIT_DETAILS = gql`
  query($oid: String!) {
    getCommitDetail(oid: $oid) {
      message
      messageHeadline
      pushedDate
      parentHash
      additions
      deletions
      commitUrl
      files {
        filename
        blob_url
        additions
        deletions
      }
      author {
        name
        avatarUrl
        email
      }
    }
  }
`;
