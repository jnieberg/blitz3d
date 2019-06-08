async function _eof(stream) {
	const output = stream.data;
	return await stream.position >= output.length;
}