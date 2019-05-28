var _keyHitTimes = [];
function _keyhit(code) {
	var _keyHitEvent = undefined;
	function getCode(event) {
		_keyHitEvent = event;
		const result = _scancode.indexOf(_keyHitEvent.code) === -1 ? 0 : _scancode.indexOf(_keyHitEvent.code);
		_keyHitTimes[result] = (_keyHitTimes[result] || 0) + 1;
	}
	document.addEventListener('keyup', getCode);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (_keyHitEvent) {
				document.removeEventListener('keyup', getCode);
				resolve(_keyHitTimes[code] || 0);
				_keyHitTimes = [];
				_keyHitEvent = undefined;
			} else {
				resolve(0);
			}
		});
	});
}
