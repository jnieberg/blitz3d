const url = require('url');

exports.postRequest = (req, callback) => {
	var urlParts = url.parse(req.url, true);
	const filename = urlParts.pathname.substring(2);
	let queryRaw = '';
	req.on('data', chunk => {
		queryRaw += chunk.toString();
	});
	req.on('end', () => {
		const query = JSON.parse(queryRaw);
		try {
			const file = require(`./commands/${filename}`);
			const fn = file['fn'];
			callback(fn, query);
		} catch (err) {
			callback(() => { }, query);
		}
	});
}