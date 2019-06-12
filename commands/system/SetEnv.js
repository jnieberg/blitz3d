async function _setenv(variable, value) {
	return await _postCommand('setenv', { variable: variable, value: value });
}