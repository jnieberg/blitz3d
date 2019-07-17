async function _filesize(filename) {
	const res = await _getCommand('filesize', filename)
	console.log('size', filename, res);
	return res;
}