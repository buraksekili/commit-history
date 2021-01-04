import gql from "graphql-tag";

export const GET_COMMITS = gql`
  query($cursor: String, $first: Int, $last: Int) {
    repository(name: "react", owner: "facebook") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: $first, last: $last, before: $cursor) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              edges {
                node {
                  messageHeadline
                  message
                  oid
                  abbreviatedOid
                  pushedDate
                  parents(first: 1) {
                    nodes {
                      abbreviatedOid
                    }
                  }
                  author {
                    name
                    email
                    date
                    avatarUrl
                    user {
                      url
                      bio
                      location
                      login
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COMMIT_DETAIL = gql`
  query($oid: GitObjectID!) {
    repository(owner: "facebook", name: "react") {
      ref(qualifiedName: "master") {
        repository {
          object(oid: $oid) {
            ... on Commit {
              pushedDate
              oid
              message
              messageHeadline
              additions
              deletions
              commitUrl
              parents(first: 1) {
                nodes {
                  abbreviatedOid
                }
              }
              author {
                name
                email
                date
                avatarUrl
                user {
                  url
                  bio
                  location
                  login
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
