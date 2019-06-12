const fs = require('fs');

exports.fn = (res, query) => {
	res.end(String(fs.statSync(query).size || 0));
};