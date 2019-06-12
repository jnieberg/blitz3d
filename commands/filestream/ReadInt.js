function _readint(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 4);
	let number = _string2int(string);
	if (number >= _INTEGER_MAX) {
		number = number - _INTEGER_MAX * 2;
	}
	stream.position += string.length;
	return number;
}