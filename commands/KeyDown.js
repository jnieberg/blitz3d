var _keyDownBoolean = 0;
function keydown(code) {
	var _keyDownEvent = undefined;
	function getKeyDown(event) {
		_keyDownEvent = event;
		const result = _scancode.indexOf(_keyDownEvent.code) === -1 ? 0 : _scancode.indexOf(_keyDownEvent.code);
		if (result === code) {
			_keyDownBoolean = 1;
		}
	}
	function removeKeyDown(event) {
		_keyDownEvent = undefined;
		_keyDownBoolean = 0;
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			document.addEventListener('keydown', getKeyDown);
			document.addEventListener('keyup', removeKeyDown);
			resolve(_keyDownBoolean);
		});
	});
}
