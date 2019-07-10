var _delayTimer = undefined;
async function _delay(ms) {
	let timer = _millisecs();
	_delayTimer = timer;
	while (await _async()) {
		timer = _millisecs();
		if (timer - _delayTimer >= ms) {
			break;
		}
	}
}
