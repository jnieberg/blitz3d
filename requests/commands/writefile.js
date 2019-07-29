const fs = require('fs');
const path = require('path');

exports.fn = (res, query) => {
	try {
		const filename = path.normalize(path.dirname(require.main.filename) + '\\public\\' + query.name);
		fs.writeFile(filename, query.data, 'binary', (err, data) => {
			if (err) throw err;
			res.json({
				name: query.name,
				data: query.data,
				position: 0,
				readonly: false
			});
		});
	} catch (err) {
		res.status(404).end();
	}
};