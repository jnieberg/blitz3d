async function _writefile(filename) {
	return await _postCommand('writefile', {
		name: filename.trim(),
		data: ''
	})
}