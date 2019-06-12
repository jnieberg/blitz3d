async function _openfile(filename) {
	const result = await _getCommand('openfile', filename);
	return {
		name: filename.trim(),
		data: result,
		position: 0,
		readonly: false
	}
}