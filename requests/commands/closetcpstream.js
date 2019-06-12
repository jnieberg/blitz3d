const { netServer } = require('./createtcpserver');

exports.fn = (res, query) => {
	if (netServer[query.name] && netServer[query.name].client[query.stream]) {
		netServer[query.name].client[query.stream].socket.end();
		res.end('1');
	}
	res.end('0');
}