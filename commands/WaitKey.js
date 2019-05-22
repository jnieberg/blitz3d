function WaitKey() {
	var _waitKeyEvent = '';
	document.addEventListener('keydown', (event) => {
		_waitKeyEvent = event.code;
	});
	return new Promise((resolve, reject) => {
		setInterval(() => {
			if (_waitKeyEvent) {
				resolve(_scancode.indexOf(_waitKeyEvent));
				_waitKeyEvent = '';
			}
		});
	});
}
