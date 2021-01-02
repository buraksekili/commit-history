const GET_COMMIT_DETAIL = `
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
                avatarUrl
                email
                name
              }
            }
          }
        }
      }
    }
  }
`;
module.exports = { GET_COMMIT_DETAIL };
