import { _netserver } from "./createtcpserver.js";

var readTimeout = 5000;
var acceptTimeout = 0;

const _readTimeout = () => readTimeout;
export { _readTimeout as readTimeout };
const _acceptTimeout = () => acceptTimeout;
export { _acceptTimeout as acceptTimeout };

export function fn(res, query) {
  readTimeout = query.read;
  acceptTimeout = query.accept;
  if (_netserver) {
    for (let server in _netserver) {
      if (_netserver.hasOwnProperty(server)) {
        const clients = _netserver[query.name] && _netserver[query.name].client;
        if (clients) {
          for (let sock in clients) {
            if (clients.hasOwnProperty(sock)) {
              const socket = _netserver[query.name].client[sock].socket;
              if (socket && socket.readyState === "open") {
                socket.setTimeout(readTimeout);
              }
            }
          }
        }
      }
    }
  }
  res.end();
}
