async function _writeint(stream, integer, offset) {
	const string = _int2string(integer);
	return await _writeline(stream, string, offset);
}