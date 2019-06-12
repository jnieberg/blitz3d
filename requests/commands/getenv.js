exports.fn = (res, query) => {
	try {
		res.end(process.env[query]);
	} catch (err) {
		res.status(404).end();
	}
};