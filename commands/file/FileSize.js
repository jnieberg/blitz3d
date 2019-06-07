async function _filesize(filename) {
	return await _getCommand('filesize', filename);
}