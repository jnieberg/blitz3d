async function _writeLine(stream, string) {
	if (!stream.readonly) {
		const output = stream.data;
		const newString = output.substr(0, stream.position) + string + output.substr(stream.position + string.length);
		stream.data = newString;
		stream.position += string.length;
		if (stream.name.indexOf(':') > -1) { //TCP
			await _getCommand('writeline', stream);
		}
	}
}