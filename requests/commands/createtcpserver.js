import { createServer } from "net";

export const _netserver = {};

export function fn(res, query) {
  const name = `127.0.0.1:${query.port}`;
  const port = Number(query.port);
  if (_netserver[name]) {
    for (let sock in _netserver[name].client) {
      if (_netserver[name].client.hasOwnProperty(sock)) {
        _netserver[name].client[sock].data = "";
      }
    }
    console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server was already started.`);
    res.end(name);
  } else {
    _netserver[name] = {};
    _netserver[name].client = {};
    _netserver[name].server = createServer((socket) => {
      _netserver[name].client[socket.remotePort] = {};
      _netserver[name].client[socket.remotePort].socket = socket;
      socket
        .on("data", (data) => {
          _netserver[name].client[socket.remotePort].data = data.toString();
          console.log(`[SYSTEM] - http://127.0.0.1:${port}:${socket.remotePort} TCP client data sent.`);
        })
        .on("close", () => {
          delete _netserver[name].client[socket.remotePort];
        });
    })
      .on("close", () => {
        console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server closed.`);
        delete _netserver[name];
      })
      .listen(port, "127.0.0.1", () => {
        console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server started.`);
        res.end(name);
      });
  }
}
