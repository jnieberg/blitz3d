async function _writebytes(bank, stream, offset, count) { // from bank to stream
	const bytes = new Uint8Array(bank, offset, count).toString().split(',');
	const string = _bytes2string(bytes);
	const result = await _writeline(stream, string);
	return result.position;
}