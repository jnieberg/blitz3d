function _copystream(streamFrom, streamTo, size) {
	_copybank(streamFrom, 0, streamTo, 0, size);
	streamTo.position += size;
}