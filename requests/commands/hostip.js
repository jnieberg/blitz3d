const os = require('os');

exports.fn = (res, query) => {
	const ips = [];
	const interfaces = os.networkInterfaces();
	for (let interface in interfaces) {
		if (interfaces.hasOwnProperty(interface)) {
			ips.push(...interfaces[interface].filter(result => result.family === 'IPv4' && !result.internal));
		}
	}
	const ip = ips[query - 1].address;
	const ipInteger = ip.split('.').reduce(function (ipInt, octet) { return (ipInt << 8) + parseInt(octet, 10) }, 0) >>> 0;
	res.end(String(ipInteger));
};