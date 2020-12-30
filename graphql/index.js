const typeDefs = require("./type-defs");
const resolvers = require("./resolvers/resolvers");

module.exports = {
  resolvers: {
    Query: {
      ...resolvers.Query,
    },
  },
  typeDefs,
};
