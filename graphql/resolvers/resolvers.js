const axios = require("axios");
const {
  getCommitsBefore,
  getCommitsAfter,
  getFirstCommits,
} = require("./commits");
const { parseResponse } = require("../../util");
const { headers, GITHUB_API_URL } = require("../../config");

const resolvers = {
  Query: {
    async getCommitsAfter(_, { endCursor, number }) {
      if (!number) {
        number = 3;
      }
      const query = JSON.stringify(getCommitsAfter(endCursor, number));
      try {
        const response = await axios.post(GITHUB_API_URL, query, {
          headers,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors);
        }

        const parsedRespone = parseResponse(response);
        return parsedRespone;
      } catch (error) {
        console.log("erroumuz ", error);
      }
    },
    async getCommitsBefore(_, { endCursor, number }) {
      if (!number) {
        number = 3;
      }
      const query = JSON.stringify(getCommitsBefore(endCursor, number));
      try {
        const response = await axios.post(GITHUB_API_URL, query, {
          headers,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors);
        }

        const parsedRespone = parseResponse(response);
        return parsedRespone;
      } catch (error) {
        console.log("erroumuz ", error);
      }
    },
    async getFirstCommits(_, { number }) {
      const query = JSON.stringify(getFirstCommits(number));
      try {
        const response = await axios.post(GITHUB_API_URL, query, {
          headers,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        const parsedRespone = parseResponse(response);
        return parsedRespone;
      } catch (error) {
        console.log("erroumuz ", error);
      }
    },
  },
};

module.exports = resolvers;
