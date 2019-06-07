async function _deletedir(path) {
	await _postCommand('deletedir', { path: path });
}