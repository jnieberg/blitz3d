async function _changedir(directory) {
	let newPath = _currentDirCached + '/' + directory;
	if (directory.indexOf('/') === 0 || directory.indexOf('\\') === 0) {
		newPath = directory;
	}
	const result = await _postCommand('changedir', { directory: newPath });
	if (result !== 0) {
		_currentDirCached = result;
	}
}