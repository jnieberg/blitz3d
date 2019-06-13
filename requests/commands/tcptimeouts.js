const { netServer } = require('./createtcpserver');

var readTimeout = 5000;
var acceptTimeout = 0;

exports.readTimeout = () => readTimeout;
exports.acceptTimeout = () => acceptTimeout;

exports.fn = (res, query) => {
	readTimeout = query.read;
	acceptTimeout = query.accept;
	if (netServer) {
		for (let server in netServer) {
			if (netServer.hasOwnProperty(server)) {
				const clients = netServer[query.name] && netServer[query.name].client;
				if (clients) {
					for (let sock in clients) {
						if (clients.hasOwnProperty(sock)) {
							const socket = netServer[query.name].client[sock].socket;
							if (socket && socket.readyState === 'open') {
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