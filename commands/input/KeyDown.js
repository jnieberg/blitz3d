var _keyDownList = {};
function _keyDownGetKeyDown(event) {
  //event.preventDefault();
  const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  _keyDownList[key] = 1;
}
function _keyDownRemoveKeyDown(event) {
  //event.preventDefault();
  const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  delete _keyDownList[key];
}

function _keydown(code) {
  return _keyDownList[code] || 0;
}
