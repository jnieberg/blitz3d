function _waitkey(char) {
	var _waitKeyEvent = undefined;
	function getCode(event) {
		_waitKeyEvent = event;
	}
	function done() {
		document.removeEventListener('keydown', getCode);
		return _waitKeyEvent.keyCode;
	}
	document.addEventListener('keydown', getCode);
	return new Promise((resolve) => {
		setInterval(() => {
			if (_waitKeyEvent) {
				if (char) {
					if (_waitKeyEvent.location === 0) {
						resolve(done());
					}
				} else {
					resolve(done());
				}
			}
		});
	});
}
