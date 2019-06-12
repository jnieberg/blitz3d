const fs = require('fs');

exports.fn = (res, query) => {
	try {
		if (fs.statSync(query).isDirectory()) {
			res.end('2');
		} else {
			res.end('1');
		}
	} catch (err) {
		res.status(404).end('0');
	}
};