function KeyHit(code) {
	var _waitKeyEvent = '';
	document.addEventListener('keydown', (event) => {
		_waitKeyEvent = event.code;
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(_scancode.indexOf(_waitKeyEvent) === code);
			_waitKeyEvent = '';
		});
	});
}
