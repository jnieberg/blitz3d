var _delayTimeout = undefined;

async function _delay(ms) {
	// clearTimeout(_delayTimeout);
	// return new Promise(resolve => _delayTimeout = setTimeout(resolve, ms));
	_delayTimeout = _millisecs();
	while (await _async(ms)) {
		const timer = _millisecs();
		if (timer - _delayTimeout >= ms) {
			break;
		}
	}
}
