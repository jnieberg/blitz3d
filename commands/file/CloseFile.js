async function _closefile(stream) {
	if (!stream.readonly) {
		await _postCommand('writefile', {
			name: stream.name,
			data: stream.data
		});
	}
}