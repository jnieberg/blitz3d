async function _tcptimeouts(read, accept) {
	return await _postCommand('tcptimeouts', { read: read, accept: accept });
}