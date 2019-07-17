var _readDirList = {};

async function _readdir(foldername) {
	const dir = await _postCommand('readdir', { root: _currentDirCached, folder: foldername });
	_readDirList[dir.folder] = dir;
	console.log(dir);
	return _readDirList[dir.folder];
}