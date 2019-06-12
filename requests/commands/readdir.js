const fs = require('fs');

exports.fn = (res, query) => {
	fs.readdir(query, (err, files) => {
		const result = [];
		files.forEach(file => {
			let type = 1;
			try {
				if (fs.statSync(query + '/' + file).isDirectory()) {
					type = 2;
				}
				result.push({
					name: file,
					type: type
				});
			} catch (err) { }
		});
		res.json(result);
	});
};