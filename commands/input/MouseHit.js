var _mouseHitTimes = [];
function _mouseHitGetCode(event) {
	const mouseIndex = [0, 1, 3, 2];
	const result = mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
	_mouseHitTimes[result] = (_mouseHitTimes[result] || 0) + 1;
}
_addListener('mousedown', _mouseHitGetCode, 'mousehit');

function _mousehit(button) {
	const res = _mouseHitTimes[button];
	if (res > 0) {
		_mouseHitTimes[button] = 0;
		return res || 0;
	} else {
		return 0;
	}
}
