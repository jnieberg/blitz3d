function _readint(stream) {
	const output = stream.data;
	const string = output.slice(stream.position, stream.position + 4);
	let number = _string2int(string);
	if (number >= _INTEGER_MAX) {
		number = number - _INTEGER_MAX * 2;
	}
	stream.position += string.length;
	return number;
}