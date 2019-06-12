function _readbytes(bank, stream, offset, count) { // from stream to bank
	const string = stream.data.substring(offset, offset + count);
	const bytes = _string2bytes(string);
	const view = new DataView(bank, offset, count);
	for (let i = 0; i < count; i++) {
		view.setUint8(i, bytes[i]);
	}
	return count;
}