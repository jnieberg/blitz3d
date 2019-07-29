async function _openfile(filename) {
	let path = _normalizeFile(filename);
	const result = await _getCommand('openfile', path);
	return {
		name: path,
		data: result,
		position: 0,
		readonly: false
	}
}