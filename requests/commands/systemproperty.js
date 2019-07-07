exports.fn = (res, query) => {
	const props = {
		systemdir: process.env['Path'].split(';')[0],
		windowsdir: process.env['windir'],
		tempdir: process.env['TEMP'],
		appdir: process.cwd()
	}
	if (props[query]) {
		res.end(props[query]);
	} else {
		res.end(process.env[query]);
	}
};