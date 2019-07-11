function _mid(string, offset, characters) {
	const len = isNaN(offset - 1 + characters) ? undefined : offset - 1 + characters;
	return (string || '').substring(offset - 1, len);
}