var _keyDownList = {};
function _keyDownGetKeyDown(event) {
	const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
	_keyDownList[key] = true;
}
function _keyDownRemoveKeyDown(event) {
	const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
	delete _keyDownList[key];
}
_addListener('keydown', _keyDownGetKeyDown, 'keydown');
_addListener('keyup', _keyDownRemoveKeyDown, 'keydown');

function _keydown(code) {
	//return new Promise((resolve, reject) => {
	// setTimeout(() => {
	// 	resolve(_keyDownList[code]);
	// });
	//});
	return _keyDownList[code];
}
