function _nextfile(directory) {
	return directory && directory.file && directory.file[directory.position] && directory.file[directory.position].name ?
		directory.file[directory.position++].name :
		'';
}