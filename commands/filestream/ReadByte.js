function _readbyte(stream) {
	const string = stream.data.slice(stream.position, stream.position + 1);
	stream.position += string.length;
	return (string.charCodeAt(0) + _BYTE_MAX) % _BYTE_MAX;
}