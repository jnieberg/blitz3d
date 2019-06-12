const fs = require('fs');

exports.fn = (res, query) => {
	try {
		fs.readFile(query, 'utf8', (err, data) => {
			res.end(data);
		});
	} catch (err) {
		res.status(404).end('');
	}
};