async function _filetype(filename) {
	const folder = filename.replace(/^(.*[\/\\])(.*?)$/, '$1');
	const file = filename.replace(/^(.*[\/\\])(.*?)$/, '$2');
	return _readDirList[folder] && _readDirList[folder].file && _readDirList[folder].file.find(res => res.name === file) ?
		_readDirList[folder].file.find(res => res.name === file).type :
		Number(await _postCommand('filetype', { root: _currentDirCached, filename: filename }));
}