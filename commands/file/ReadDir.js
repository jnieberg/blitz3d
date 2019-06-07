async function _readdir(foldername) {
	const file = await _getCommand('readdir', foldername);
	return {
		folder: foldername,
		file: file,
		position: 0
	};
}