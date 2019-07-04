const url = require('url');

exports.getRequest = (req, callback) => {
	var urlParts = url.parse(req.url, true);
	const filename = urlParts.pathname.substring(2);
	const query = urlParts.search.substring(1);
	try {
		const file = require(`./commands/${filename}`);
		const fn = file['fn'];
		callback(fn, decodeURI(query));
	} catch (err) {
		console.log(err);
		callback(() => { }, decodeURI(query));
	}
}
