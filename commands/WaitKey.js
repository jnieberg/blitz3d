function waitkey(chr) {
	var _waitKeyEvent = undefined;
	function getCode(event) {
		_waitKeyEvent = event;
	}
	function done() {
		document.removeEventListener('keydown', getCode);
		return _waitKeyEvent.key;
	}
	document.addEventListener('keydown', getCode);
	return new Promise((resolve, reject) => {
		setInterval(() => {
			if (_waitKeyEvent) {
				if (chr) {
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
