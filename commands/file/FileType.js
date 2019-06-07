async function _filetype(filename) {
	return Number(await _getCommand('filetype', filename));
}