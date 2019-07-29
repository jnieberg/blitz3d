const fs = require('fs');
const path = require('path');

exports.fn = (res, query) => {
	try {
		const filename = path.normalize(path.dirname(require.main.filename) + '\\public\\' + query);
		fs.readFile(filename, 'binary', (err, data) => {
			if (err) {
				console.log(err);
				res.status(404).end('0');
			}
			res.end(data);
		});
	} catch (err) {
		res.status(404).end('0');
	}
};