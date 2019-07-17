const fs = require('fs');
const path = require('path');

exports.fn = (res, query) => {
	try {
		const folder = path.normalize(path.dirname(require.main.filename) + '\\shared\\' + query.root + '\\' + query.filename);
		if (fs.statSync(folder).isDirectory()) {
			res.end('2');
		} else {
			res.end('1');
		}
	} catch (err) {
		res.status(404).end('0');
	}
};