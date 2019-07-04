const Jimp = require('jimp');

function decodeBase64Image(data) {
	var matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};
	if (matches.length !== 3) {
		return new Error('Invalid input string');
	}
	response.type = matches[1];
	response.data = Buffer.from(matches[2], 'base64');
	return response;
}

exports.fn = (res, query) => {
	let data = query.data;
	try {
		data = decodeBase64Image(data);
		Jimp.read(data.data).then(image => {
			res.end('1');
			return image.write(query.filename);
		});
	} catch (err) {
		res.status(404).end('0');
	}
};