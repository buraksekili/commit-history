import gql from "graphql-tag";

export const GET_COMMITS = gql`
  query($cursor: String, $number: Int, $after: Boolean!) {
    getCommits(after: $after, cursor: $cursor, number: $number) {
      commits {
        messageHeadline
        message
        pushedDate
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
