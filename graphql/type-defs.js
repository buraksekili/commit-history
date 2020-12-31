const gql = require("graphql-tag");

const typeDefs = gql`
  type Author {
    name: String!
    avatarUrl: String!
    email: String!
  }

  type Commit {
    messageHeadline: String!
    message: String!
    pushedDate: String
    abbreviatedOid: String!
    parentHash: String!
    author: Author!
  }

  type Commits {
    commits: [Commit]!
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Query {
    getCommitsBefore(endCursor: String!, number: Int): Commits!
    getCommitsAfter(endCursor: String, number: Int): Commits!
    getFirstCommits(number: Int!): Commits!
  }
`;

module.exports = typeDefs;
