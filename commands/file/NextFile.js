function _nextfile(directory) {
	return directory.file[directory.position] ? directory.file[directory.position++].name : '';
}