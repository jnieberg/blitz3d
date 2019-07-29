function _readbytes(bank, stream, offset, count) { // from stream to bank
	let string = stream.data.substring(stream.position, stream.position + count);
	string = string.substring(offset, offset + bank.data.length);
	bank.data = string;
	return string.length;
}