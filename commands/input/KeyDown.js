var _keyDownBoolean = 0;
var _keyDownThis = 0;
var _keyDownCheck = 0;
function _keydown(code) {
	_keyDownCheck = code;
	function getKeyDown(event) {
		_keyDownThis = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
	}
	function removeKeyDown(event) {
		_keyDownThis = 0;
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			document.addEventListener('keydown', getKeyDown);
			document.addEventListener('keyup', removeKeyDown);
			resolve(_keyDownThis === _keyDownCheck);
		});
	});
}
