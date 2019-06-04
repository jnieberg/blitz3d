function _getkey() {
	var _getKeyEvent = undefined;
	function getCode(event) {
		_getKeyEvent = event;
	}
	_removeAllListeners(document, 'keydown');
	_addListener(document, 'keydown', getCode);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (_getKeyEvent && _getKeyEvent.location === 0) {
				_removeAllListeners(document, 'keydown');
				resolve(_getKeyEvent.key.length === 1 ? _asc(_getKeyEvent.key) : _getKeyEvent.keyCode || 0);
				_getKeyEvent = undefined;
			} else {
				resolve(0);
			}
		});
	});
}
