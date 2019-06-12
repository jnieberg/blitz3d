async function _writestring(stream, string) {
	if (!stream.readonly) {
		const length = _int2string(string.length);
		string = length + string;
		const output = stream.data || '';
		const newString = output.substr(0, stream.position) + string + output.substr(stream.position + string.length);
		stream.data = newString;
		stream.position += string.length;
		if (stream && stream.name && stream.name.indexOf(':') > -1) { //TCP
			stream = _postCommand('writeline', stream);
		}
	}
	return await stream;
}