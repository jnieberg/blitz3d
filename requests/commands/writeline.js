const net = require('net');

exports.fn = (res, query) => {
	const uriSplit = query.name.split(':'); // location:port
	const socket = new net.Socket();
	socket.connect(Number(uriSplit[1]), uriSplit[0], () => {
		socket.write(query.data.replace(/\\r/gm, '\r').replace(/\\n/gm, '\n'));
	});
	socket.on('data', (data) => {
		res.json({
			name: query.name,
			data: data.toString(),
			stream: socket.localPort,
			position: query.position,
			readonly: false
		});
		console.log(`[SYSTEM] - http://${query.name}:${socket.localPort} TCP client data sent.`);
	});
	socket.on('close', () => {
		console.log(`[SYSTEM] - http://${query.name}:${socket.localPort} TCP client closed.`);
		res.end();
	});
	socket.on('error', function (err) {
		console.log(err);
	})
};