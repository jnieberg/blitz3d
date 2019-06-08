function _readshort(stream) {
	const string = stream.data.slice(stream.position, stream.position + 2);
	let number = _string2int(string);
	stream.position += string.length;
	return number;
}