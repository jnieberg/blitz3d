async function _accepttcpstream(handle) {
	return await _postCommand('accepttcpstream', handle);
}