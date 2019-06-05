var _keyHitTimes = [];
function _keyHitGetCode(event) {
	const result = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
	_keyHitTimes[result] = (_keyHitTimes[result] || 0) + 1;
}
_addListener('keydown', _keyHitGetCode, 'keyhit');

function _keyhit(code) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (_keyHitTimes[code] > 0) {
				resolve(_keyHitTimes[code] || 0);
				_keyHitTimes[code] = 0;
			} else {
				resolve(0);
			}
		});
	});
}
