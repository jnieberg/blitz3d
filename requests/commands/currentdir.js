const path = require('path');

exports.fn = (res, query) => {
	res.end(path.normalize(process.cwd() + '/'));
};