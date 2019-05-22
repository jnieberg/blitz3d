var _keyDownBoolean = 0;
function KeyDown(code) {
	var _keyDownEvent = undefined;
	function getKeyDown(event) {
		_keyDownEvent = event;
		_keyDownBoolean = 1;
	}
	function removeKeyDown(event) {
		_keyDownEvent = event;
		_keyDownBoolean = 0;
		_keyDownEvent = undefined;
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			document.addEventListener('keydown', getKeyDown);
			document.addEventListener('keyup', removeKeyDown);
			resolve(_keyDownBoolean);
		}, 10);
	});
}
