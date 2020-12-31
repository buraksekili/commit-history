function parseResponse(res) {
  const result = res.data.data.repository.ref.target;

  const hasNextPage = result.history.pageInfo.hasNextPage;
  const endCursor = result.history.pageInfo.endCursor;
  const edgesArr = result.history.edges;

  const resultArr = [];
  edgesArr.forEach((edge) => {
    let response = {};
    response.messageHeadline = edge.node.messageHeadline;
    response.message = edge.node.message;
    response.author = edge.node.author;
    response.pushedDate = edge.node.author.date;
    response.abbreviatedOid = edge.node.abbreviatedOid;
    response.parentHash = edge.node.parents.nodes[0].abbreviatedOid;
    resultArr.push(response);
  });
  return { commits: resultArr, hasNextPage, endCursor };
}

module.exports = { parseResponse };
