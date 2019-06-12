async function _counthostips(host) {
	return Number(await _getCommand('counthostips', host));
}