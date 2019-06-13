const { netServer } = require('./createtcpserver');

exports.fn = (res, query) => {
	if (netServer[query]) {
		netServer[query].server.close();
		res.end('1');
	}
	res.status(404).end('0');
}