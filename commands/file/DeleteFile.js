async function _deletefile(filename) {
	await _postCommand('deletefile', { filename: filename })
}