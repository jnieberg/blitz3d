async function _readfile(filename) {
	return {
		name: filename.trim(),
		data: await _getCommand('openfile', filename),
		position: 0,
		readonly: true
	}
}