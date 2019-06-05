var _keyDownThis = 0;
var _keyDownCheck = 0;
function _keyDownGetKeyDown(event) {
	_keyDownThis = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
}
function _keyDownRemoveKeyDown(event) {
	_keyDownThis = 0;
}
_addListener('keydown', _keyDownGetKeyDown, 'keydown');
_addListener('keyup', _keyDownRemoveKeyDown, 'keydown');

function _keydown(code) {
	_keyDownCheck = code;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(_keyDownThis === _keyDownCheck);
		});
	});
}
