async function _writeshort(stream, short, offset) {
	const string = _int2string((short + _SHORT_MAX) % _SHORT_MAX, 2);
	return await _writeline(stream, string, offset);
}