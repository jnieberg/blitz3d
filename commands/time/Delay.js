var _delayTimeout = undefined;
function _delay(ms) {
	clearTimeout(_delayTimeout);
	return new Promise(resolve => _delayTimeout = setTimeout(resolve, ms));
}
