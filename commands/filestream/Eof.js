function _eof(stream) {
	const output = stream.data;
	return stream.position >= output.length;
}