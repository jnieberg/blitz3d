const os = require('os');

exports.fn = (res, query) => {
	let count = 0;
	if (query === '') {
		const interfaces = os.networkInterfaces();
		for (let interface in interfaces) {
			if (interfaces.hasOwnProperty(interface)) {
				count += interfaces[interface].filter(result => result.family === 'IPv4' && !result.internal).length;
			}
		}
		res.end(String(count));
	} else {
		res.end('1');
	}
};