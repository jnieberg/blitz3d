function _waitkey(char) {
	var _waitKeyEvent = undefined;

	function getCode(event) {
		_waitKeyEvent = event;
	}
	function done() {
		_removeAllListeners(document, 'keydown');
		return _waitKeyEvent.key.length === 1 ? _asc(_waitKeyEvent.key) : _waitKeyEvent.keyCode;
	}
	function doneKey() {
		_removeAllListeners(document, 'keydown');
		return _waitKeyEvent.key;
	}
	_removeAllListeners(document, 'keydown');
	_addListener(document, 'keydown', getCode);

	return new Promise((resolve) => {
		setInterval(() => {
			if (_waitKeyEvent) {
				if (char) {
					if (_waitKeyEvent.location === 0) {
						resolve(doneKey());
					}
				} else {
					resolve(done());
				}
				_waitKeyEvent = undefined;
			}
		});
	});
}
