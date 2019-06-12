async function _closetcpserver(server) {
	await _postCommand('closetcpserver', server);
	return undefined;
}