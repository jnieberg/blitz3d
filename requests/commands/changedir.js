exports.fn = (res, query) => {
	process.chdir(query.directory);
	res.end(process.cwd());
};