async function _opentcpstream(ip, port) {
	return await _postCommand('opentcpstream', { ip: ip, port: port });
}