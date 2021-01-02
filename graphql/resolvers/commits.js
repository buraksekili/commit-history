const { GET_COMMIT_DETAIL } = require("./commit-detail");

const GET_COMMITS_AFTER = `
query($cursor: String, $number: Int) {
    repository(name: "react", owner: "facebook") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: $number, after: $cursor) {
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

const GET_COMMITS_BEFORE = `
query($cursor: String, $number: Int) {
  repository(name: "react", owner: "facebook") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(last: $number, before: $cursor) {
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
                abbreviatedOid
                oid
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

module.exports = {
  GET_COMMIT_DETAIL,
  GET_COMMITS_AFTER,
  GET_COMMITS_BEFORE,
};
