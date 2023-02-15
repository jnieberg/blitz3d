function _print1(/** @type {_Float | boolean | number | string} */ txt = 0 || "", /** @type {boolean} */ fix = false) {
  if (_currentGraphicsBuffer.context) {
    if (txt instanceof _Float) {
      txt = txt.float;
    } else if (typeof txt === "number") {
      if (txt.toString().indexOf(".") > -1) {
        txt = _roundFloat(txt);
      }
    }
    if (_printY + _setFontCurrent.height * 0.5 > _currentGraphicsBuffer.canvas.height) {
      _saveScreen();
      _loadScreen(0, -_setFontCurrent.height);
      _printY = _printY - _setFontCurrent.height;
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillText(txt, _printX + _writeX + _originX, _printY + _originY + offY);
    if (!fix) {
      _printY = _printY + _setFontCurrent.height;
      _printX = 0;
    }
    _writeX = 0;
  }
}
function _print(/** @type {_Float | boolean | number | string} */ txt = 0 || "") {
  _print1(txt);
}
