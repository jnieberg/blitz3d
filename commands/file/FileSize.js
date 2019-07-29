async function _filesize(filename) {
	const res = await _getCommand('filesize', filename)
	return res;
}