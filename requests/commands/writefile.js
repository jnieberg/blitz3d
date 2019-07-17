const fs = require('fs');

exports.fn = (res, query) => {
	try {
		fs.writeFile(query.name, query.data, 'binary', (err, data) => {
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