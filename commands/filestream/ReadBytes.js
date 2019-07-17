function _readbytes(bank, stream, offset, count) { // from stream to bank
	let string = stream.data.substring(offset, offset + count);
	string = string.substring(0, bank.data.length);
	bank.data = string;
	return string.length;
}