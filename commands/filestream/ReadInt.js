function _readint(stream) {
	const string = stream.data.slice(stream.position, stream.position + 4);
	let number = _string2int(string);
	if (number >= _INTEGER_MAX) {
		number = number - _INTEGER_MAX * 2;
	}
	stream.position += string.length;
	return number;
}