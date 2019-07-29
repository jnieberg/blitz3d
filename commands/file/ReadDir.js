var _readDirList = {};

async function _readdir(directory) {
	let path = _normalizeFile(directory);
	const dir = await _postCommand('readdir', { folder: path });
	_readDirList[dir.folder] = dir;
	return _readDirList[dir.folder];
}