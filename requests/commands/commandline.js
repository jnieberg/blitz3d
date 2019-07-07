exports.fn = (res, query) => {
	const result = process.argv.slice(2).join(' ');
	res.end(result);
};