async function _writeline(stream, string, position) {
	if (!stream.readonly) {
		position = typeof position === 'undefined' ? stream.position : position;
		string = string + '\n';
		const output = stream.data || '';
		const newString = output.substr(0, position) + string + output.substr(position + string.length);
		stream.data = newString;
		stream.position += string.length;
		console.log(stream);
		if (stream && stream.name && stream.data && stream.name.indexOf(':') > -1 && (stream.data.endsWith('\n\n') || stream.data.endsWith('\\n\\n'))) { //TCP
			stream = _postCommand('writeline', stream);
		}
	}
	return await stream;
}