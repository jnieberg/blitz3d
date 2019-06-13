const net = require('net');
const { netServer } = require('./createtcpserver');
const { readTimeout } = require('./tcptimeouts');

exports.fn = (res, query) => {
	const name = `${query.ip.trim()}:${query.port}`;
	const socket = new net.Socket();
	socket.connect(query.port, query.ip, () => {
		if (!netServer[name]) {
			netServer[name] = {};
			netServer[name].client = {};
		}
		if (!netServer[name].client[socket.localPort]) {
			netServer[name].client[socket.localPort] = {};
			netServer[name].client[socket.localPort].socket = socket;
			console.log(`[SYSTEM] - http://${query.ip}:${query.port}:${socket.localPort} TCP client connection successfully established.`);
		} else {
			console.log(`[SYSTEM] - http://${query.ip}:${query.port} TCP client connection already used.`);
		}
		res.json({
			name: name,
			data: '',
			stream: socket.localPort,
			position: 0,
			readonly: false
		});
		socket.pipe(socket);
	});
	socket.on('error', function (err) {
		console.log(`[SYSTEM] - http://${query.ip}:${query.port} TCP server not found.`);
		res.status(404).end('0');
	});
	socket.on('timeout', () => {
		console.log(`[SYSTEM] - http://${query.ip}:${query.port}:${socket.localPort} TCP client connection timeout.`);
		socket.end();
		res.status(404).end('0');
	});
	socket.setTimeout(readTimeout());
};