// parseResponse parses response of getCommits
// based on the type definition
function parseResponse(res) {
  const result = res.data.data.repository.ref.target;

  const hasNextPage = result.history.pageInfo.hasNextPage;
  const hasPreviousPage = result.history.pageInfo.hasPreviousPage;
  const endCursor = result.history.pageInfo.endCursor;
  const startCursor = result.history.pageInfo.startCursor;
  const edgesArr = result.history.edges;

  const resultArr = [];
  edgesArr.forEach((edge) => {
    let response = {};
    response.messageHeadline = edge.node.messageHeadline;
    response.message = edge.node.message;
    response.author = edge.node.author;
    response.pushedDate = edge.node.author.date;
    response.oid = edge.node.oid;
    response.abbreviatedOid = edge.node.abbreviatedOid;
    response.parentHash = edge.node.parents.nodes[0].abbreviatedOid;
    resultArr.push(response);
  });
  return {
    commits: resultArr,
    hasNextPage,
    endCursor,
    startCursor,
    hasPreviousPage,
  };
}

function parseCommitDetails(res) {
  const details = res.data.data.repository.ref.repository.object;
  details.parentHash = details.parents.nodes[0].abbreviatedOid;
  delete details.parents;
  return details;
}

module.exports = { parseResponse, parseCommitDetails };
