var _getKeyEvent = undefined;
function _getkey() {
	function getCode(event) {
		_getKeyEvent = event;
	}
	_addListener('keydown', getCode, 'getkey');
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if (_getKeyEvent && _getKeyEvent.location === 0) {
	// 			resolve(_getKeyEvent.which || _getKeyEvent.keyCode || 0);
	// 			_getKeyEvent = undefined;
	// 		} else {
	// 			resolve(0);
	// 		}
	// 	});
	// });
	const res = _getKeyEvent;
	if (res && res.location === 0) {
		_getKeyEvent = undefined;
		return res.which || res.keyCode || 0;
	} else {
		return 0;
	}
}
