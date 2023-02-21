var _keyHitTimes = [];
function _keyHitGetCode(event) {
  const result = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  _keyHitTimes[result] = (_keyHitTimes[result] || 0) + 1;
}
_addListener("keydown", _keyHitGetCode, "keyhit");

function _keyhit(code) {
  const res = _keyHitTimes[code];
  if (res > 0) {
    _keyHitTimes[code] = 0;
    return res || 0;
  } else {
    return 0;
  }
}
