const mkdirp = require('mkdirp');

exports.fn = (res, query) => {
	mkdirp(query.path, err => {
		if (err) {
			res.status(404).end();
		} else {
			res.end();
		}
	});
};