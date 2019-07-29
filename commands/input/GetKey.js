var _getKeyEvent = undefined;
function _getkey() {
	function getCode(event) {
		_getKeyEvent = event;
	}
	_addListener('keydown', getCode, 'getkey');
	const res = _getKeyEvent;
	if (res && res.location === 0) {
		_getKeyEvent = undefined;
		return (res.key.length === 1 && _asc(res.key)) || res.which || res.keyCode || 0;
	} else {
		return 0;
	}
}
