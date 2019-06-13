const { netServer } = require('./createtcpserver');

exports.fn = (res, query) => {
	const name = query.name;
	const socket = netServer[name].client[query.stream].socket;
	if (socket.readyState === 'open') {
		const requestData = query.data.replace(/\\r/gm, '\r').replace(/\\n/gm, '\n') + '\n';
		socket.write(requestData);
		let body = '';
		socket.on('data', (data) => {
			body += data.toString();
		});
		socket.on('end', () => {
			res.json({
				name: query.name,
				data: body,
				stream: query.stream,
				position: query.position,
				readonly: false
			});
		});
		socket.on('close', () => {
			res.end();
		});
	}
};