async function _createdir(path) {
	await _postCommand('createdir', { path: path });
}