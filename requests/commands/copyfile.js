const fs = require('fs');

exports.fn = (res, query) => {
	fs.copyFile(query.from, query.to, err => {
		if (err) {
			res.status(404).end();
		} else {
			res.end();
		}
	});
};