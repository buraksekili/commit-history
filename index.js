require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: 5000 })
  .then((res) => console.log(`running at ${res.url}`));
