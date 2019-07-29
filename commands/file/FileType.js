async function _filetype(filename) {
	const path = _normalizeFile(filename);
	const folder = path.replace(/^(.*[\/\\])(.*?)$/, '$1');
	const file = path.replace(/^(.*[\/\\])(.*?)$/, '$2');
	return _readDirList[folder] && _readDirList[folder].file && _readDirList[folder].file.find(res => res.name === file) ?
		_readDirList[folder].file.find(res => res.name === file).type :
		Number(await _postCommand('filetype', { folder: folder, filename: file }));
}