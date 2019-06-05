var _mouseHitTimes = [];
function _mouseHitGetCode(event) {
	const mouseIndex = [0, 1, 3, 2];
	const result = mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
	_mouseHitTimes[result] = (_mouseHitTimes[result] || 0) + 1;
}
_addListener('mousedown', _mouseHitGetCode, 'mousehit');

function _mousehit(button) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (_mouseHitTimes[button] > 0) {
				resolve(_mouseHitTimes[button] || 0);
				_mouseHitTimes[button] = 0;
			} else {
				resolve(0);
			}
		});
	});
}
