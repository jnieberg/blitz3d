async function _writeshort(stream, short) {
	const string = _int2string((short + _SHORT_MAX) % _SHORT_MAX, 4);
	return await _writeline(stream, string);
}