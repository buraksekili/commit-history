const getFirstCommits = (number) => {
  const body = {
    query: `
    {
      repository(name: "react", owner: "facebook") {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: ${number}) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    messageHeadline
                    message
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
    `,
  };
  return body;
};

const getCommitsAfter = (endCursor, number) => {
  const body = {
    query: `
    {
        repository(name: "react", owner: "facebook") {
          ref(qualifiedName: "master") {
            target {
              ... on Commit {
                history(first: ${number}, after: "${endCursor}") {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    node {
                      messageHeadline
                      message
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
    `,
  };
  return body;
};
const getCommitsBefore = (endCursor, number) => {
  const body = {
    query: `
    {
      repository(name: "react", owner: "facebook") {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(last: ${number}, before: "${endCursor}") {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    messageHeadline
                    message
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
    `,
  };
  return body;
};

module.exports = {
  getCommitsBefore,
  getCommitsAfter,
  getFirstCommits,
};
