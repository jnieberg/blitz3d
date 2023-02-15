const { _netserver } = require("./createtcpserver");

exports.fn = (res, query) => {
  if (_netserver[query]) {
    _netserver[query].server.close();
    res.end("1");
  }
  res.status(404).end("0");
};
