function WaitKey() {
	var _waitKeyEvent = undefined;
	function getCode(event) {
		_waitKeyEvent = event;
	}
	document.addEventListener('keydown', getCode);
	return new Promise((resolve, reject) => {
		setInterval(() => {
			if (_waitKeyEvent) {
				console.log(_waitKeyEvent);
				document.removeEventListener('keydown', getCode);
				resolve(_waitKeyEvent.keyCode);
				_waitKeyEvent = undefined;
			}
		});
	});
}
