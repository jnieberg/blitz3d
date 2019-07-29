async function _writebytes(bank, stream, offset, count) { // from bank to stream
	let string = bank.data.substring(offset, offset + count);
	string = string.substring(offset, offset + count);
	stream.data = string;
	return string.length;
}