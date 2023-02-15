const { _netserver } = require("./createtcpserver");

exports.fn = (res, query) => {
  const client = _netserver[query.name] && _netserver[query.name].client[query.stream];
  if (client) {
    client.socket.end();
    res.end("1");
    console.log(`[SYSTEM] - http://${query.name}:${query.stream} TCP client closed.`);
  }
  res.status(404).end("0");
  console.log(`[SYSTEM] - http://${query.name}:${query.stream} TCP client was already closed.`);
};
