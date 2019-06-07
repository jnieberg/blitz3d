var _currentDirCached = '';
async function _currentdir() {
	_currentDirCached = _currentDirCached || await _getCommand('currentdir');
	return _currentDirCached;
}