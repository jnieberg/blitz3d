exports.fn = (res, query) => {
	try {
		process.env[query.variable] = query.value;
		res.end();
	} catch (err) {
		res.status(404).end();
	}
};