async function _hostip(index) {
	return Number(await _getCommand('hostip', index));
}