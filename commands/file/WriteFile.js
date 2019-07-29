async function _writefile(filename) {
	let path = _normalizeFile(filename);
	return await _postCommand('writefile', {
		name: path,
		data: ''
	});
}