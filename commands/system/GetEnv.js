async function _getenv(variable) {
	return await _getCommand('getenv', variable);
}