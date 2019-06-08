async function _writeint(stream, integer) {
	const string = _int2string(integer);
	return await _writeline(stream, string);
}