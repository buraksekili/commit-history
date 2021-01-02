const axios = require("axios");
const {
  GET_COMMIT_DETAIL,
  GET_COMMITS_BEFORE,
  GET_COMMITS_AFTER,
} = require("./commits");
const { parseResponse, parseCommitDetails } = require("../../util");
const { headers, GITHUB_API_URL } = require("../../config");
const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    async getCommits(_, { cursor, number, after }) {
      if (!number) {
        number = 5;
      }

      // If cursor is not specified, It means initial request to fetch
      // a list of commits.
      if (!cursor) {
        const query = JSON.stringify({
          query: GET_COMMITS_AFTER,
          variables: { number },
        });
        try {
          const res = await axios.post(GITHUB_API_URL, query, { headers });
          if (res.data.errors) {
            throw new Error(res.data.errors);
          }
          return parseResponse(res);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new AuthenticationError(
              `Unauthorized GitHub access. ${error.response.status}`
            );
          }
          throw new Error("Internal error happened" + error.message);
        }
      }

      // If after is true, it means we need to fetch next ${number} commits
      let query;
      if (after) {
        query = JSON.stringify({
          query: GET_COMMITS_AFTER,
          variables: { cursor, number },
        });
      } else {
        query = JSON.stringify({
          query: GET_COMMITS_BEFORE,
          variables: { cursor, number },
        });
      }

      try {
        const response = await axios.post(GITHUB_API_URL, query, { headers });
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        return parseResponse(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new AuthenticationError(
            `Unauthorized GitHub access. ${error.response.status}`
          );
        }
        throw new Error("Internal error happened" + error.message);
      }
    },
    async getCommitDetail(_, { oid }) {
      try {
        const query = JSON.stringify({
          query: GET_COMMIT_DETAIL,
          variables: { oid },
        });
        const response = await axios.post(GITHUB_API_URL, query, { headers });
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
        const parsedResponse = parseCommitDetails(response);

        // get edited files information from GitHub REST API.
        const res = await axios.get(
          `https://api.github.com/repos/facebook/react/commits/${oid}`,
          { headers }
        );
        parsedResponse.files = res.data.files;
        return parsedResponse;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            throw new Error("Invalid oid for commit");
          } else if (error.response.status === 401) {
            throw new AuthenticationError(
              `Unauthorized GitHub access. ${error.response.status}`
            );
          }
        }
        if (error.message.includes("oid")) {
          throw new Error("Invalid oid for commit");
        }
        throw new Error("Internal server error!");
      }
    },
  },
};

module.exports = resolvers;
