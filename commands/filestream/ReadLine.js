function _readline(stream) {
	var nextBreak = stream.data.indexOf('\n', stream.position + 1);
	nextBreak = nextBreak > -1 ? nextBreak : stream.data.length;
	const output = stream.data.substring(stream.position, nextBreak);
	stream.position += output.length + 1;
	return output.substring(0, output.length - 1);
}