const gql = require("graphql-tag");

const typeDefs = gql`
  type Author {
    name: String!
    avatarUrl: String!
    email: String!
  }

  type File {
    filename: String
    blob_url: String
    additions: Int
    deletions: Int
  }

  type Commit {
    messageHeadline: String!
    message: String!
    pushedDate: String
    oid: String
    abbreviatedOid: String!
    parentHash: String!
    author: Author!
    additions: Int
    deletions: Int
    commitUrl: String

    # If commit details are requsted, the files related
    # with the commit will be stored as an array of File type
    files: [File]
  }

  type Commits {
    commits: [Commit]!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    endCursor: String
    startCursor: String
  }

  type Query {
    getCommits(cursor: String, number: Int, after: Boolean!): Commits!
    getCommitDetail(oid: String!): Commit
  }
`;

module.exports = typeDefs;
