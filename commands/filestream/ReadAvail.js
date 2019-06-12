function _readavail(stream) {
	return stream.data.length - stream.position < 0 ? 0 : stream.data.length - stream.position;
}