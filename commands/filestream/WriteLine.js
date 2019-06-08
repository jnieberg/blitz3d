async function _writeline(stream, string) {
	if (!stream.readonly) {
		const output = stream.data;
		const newString = output.substr(0, stream.position) + string + output.substr(stream.position + string.length);
		stream.data = newString;
		stream.position += string.length;
		if (stream.name.indexOf(':') > -1 && stream.data.endsWith('\n')) { //TCP
			stream = _getCommand('writeline', stream);
		}
	}
	return await stream;
}