const { netServer } = require('./createtcpserver');

exports.fn = (res, query) => {
	if (query) {
		if (netServer[query] && netServer[query].client) {
			const client = netServer[query].client;
			for (let sock in client) {
				if (client.hasOwnProperty(sock)) {
					const socket = client[sock].socket;
					const data = client[sock].data;
					if (data !== '') {
						client[sock].data = '';
						socket.pipe(socket);
						console.log(`[SYSTEM] - http://${query}:${sock} TCP client data retrieved.`);
						res.json({
							name: query,
							socket: sock,
							data: data,
							position: 0,
							readonly: false
						});
					}
				}
			}
		}
	}
	res.end('0');
};