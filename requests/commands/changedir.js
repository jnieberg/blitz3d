const path = require('path');

exports.fn = (res, query) => {
	try {
		const newPath = path.normalize(path.dirname(require.main.filename) + '\\shared\\' + query.directory);
		process.chdir(newPath);
		res.end(path.normalize(query.directory));
	} catch (err) {
		console.log(err);
		res.end('0');
	}
};