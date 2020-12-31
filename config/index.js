const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const GITHUB_API_URL = "https://api.github.com/graphql";

module.exports = { headers, GITHUB_API_URL };
