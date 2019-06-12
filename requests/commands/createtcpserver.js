const net = require('net');

exports.netServer = {}

exports.fn = (res, query) => {
	const name = `127.0.0.1:${query.port}`;
	const port = Number(query.port);
	if (this.netServer[name]) {
		for (let sock in this.netServer[name].client) {
			if (this.netServer[name].client.hasOwnProperty(sock)) {
				this.netServer[name].client[sock].data = '';
			}
		}
		console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server was already started.`);
		res.end(name);
	} else {
		this.netServer[name] = {};
		this.netServer[name].client = {};
		this.netServer[name].server = net
			.createServer(socket => {
				this.netServer[name].client[socket.remotePort] = {};
				this.netServer[name].client[socket.remotePort].socket = socket;
				socket
					.on('data', (data) => {
						this.netServer[name].client[socket.remotePort].data = data.toString();
						console.log(`[SYSTEM] - http://127.0.0.1:${port}:${socket.remotePort} TCP client data sent.`);
					})
					.on('close', () => {
						console.log(`[SYSTEM] - http://127.0.0.1:${port}:${socket.remotePort} TCP client closed.`);
						delete this.netServer[name].client[socket.remotePort];
					});
				socket.pipe(socket);
			})
			.on('close', () => {
				console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server closed.`);
				delete this.netServer[name];
			})
			.listen(port, '127.0.0.1', () => {
				console.log(`[SYSTEM] - http://127.0.0.1:${port} TCP server started.`);
				res.end(name);
			});
	}
};