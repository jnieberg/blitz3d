async function _changedir(directory) {
	_currentDirCached += '/' + directory;
	if (directory.indexOf(':') === 1 || directory.indexOf('/') === 0 || directory.indexOf('\\') === 0) {
		_currentDirCached = directory;
	}
	await _postCommand('changedir', { directory: directory });
}