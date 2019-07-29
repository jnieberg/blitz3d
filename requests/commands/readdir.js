const fs = require('fs');
const path = require('path');

exports.fn = (res, query) => {
	const folder = path.normalize(path.dirname(require.main.filename) + '\\public\\' + query.folder);
	fs.readdir(folder, (err, files) => {
		if (files) {
			const result = [];
			files.forEach(file => {
				let type = 1;
				try {
					if (fs.statSync(folder + '\\' + file).isDirectory()) {
						type = 2;
					}
					result.push({
						name: file,
						type: type
					});
				} catch (err) { }
			});
			res.json({
				folder: path.normalize(query.folder + '\\'),
				file: result,
				position: 0
			});
		}
		res.status(404).end('0');
	});
};