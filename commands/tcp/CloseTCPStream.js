async function _closetcpstream(stream) {
	await _postCommand('closetcpstream', stream);
	return undefined;
}