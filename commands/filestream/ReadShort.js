function _readshort(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 2);
	let number = _string2int(string);
	stream.position += string.length;
	return number;
}