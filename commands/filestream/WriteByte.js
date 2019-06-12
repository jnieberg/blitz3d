async function _writebyte(stream, byte, offset) {
	return await _writeline(stream, String.fromCharCode((byte + _BYTE_MAX) % _BYTE_MAX), offset);
}