function _writeint(stream, integer) {
	if (!stream.readonly) {
		const string = _int2string(integer);
		const output = stream.data;
		const newString = output.substr(0, stream.position) + string + output.substr(stream.position + string.length);
		stream.data = newString;
		stream.position += string.length;
	}
}