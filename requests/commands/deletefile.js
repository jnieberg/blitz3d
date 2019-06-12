const fs = require('fs');

exports.fn = (res, query) => {
	fs.unlink(query.filename, err => {
		if (err) {
			res.status(404).end();
		} else {
			res.end();
		}
	});
};