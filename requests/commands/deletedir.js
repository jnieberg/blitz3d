const fs = require('fs');

exports.fn = (res, query) => {
	fs.rmdir(query.path, err => {
		if (err) {
			res.status(404).end();
		} else {
			res.end();
		}
	});
};