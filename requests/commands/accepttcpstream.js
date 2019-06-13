const { netServer } = require('./createtcpserver');
const { acceptTimeout } = require('./tcptimeouts');

exports.fn = (res, query) => {
	if (query.name) {
		const clients = netServer[query.name] && netServer[query.name].client;
		if (clients) {
			for (let sock in clients) {
				if (clients.hasOwnProperty(sock)) {
					const client = clients[sock];
					const socket = client.socket;
					if (socket.readyState === 'open') {
						const data = client.data;
						if (typeof data !== 'undefined' && data !== '') {
							client.data = '';
							client.socket.end();
							console.log(`[SYSTEM] - http://${query.name}:${sock} TCP client data retrieved.`);
							setTimeout(() => res.json({
								name: query.name,
								socket: sock,
								data: data,
								position: 0,
								readonly: false
							}), acceptTimeout());
							return;
						}
					}
				}
			}
		}
	}
	setTimeout(() => res.status(404).end('0'), acceptTimeout());
};