async function _writebyte(stream, byte) {
	return await _writeline(stream, String.fromCharCode((byte + _BYTE_MAX) % _BYTE_MAX));
}