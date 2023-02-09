var _writeX = 0;
function _write(txt = 0 || "") {
  if (_currentGraphicsBuffer.context) {
    if (txt instanceof _Float) {
      txt = txt.float;
    } else if (typeof txt === "number") {
      txt = _roundFloat(txt);
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillText(txt, _printX + _writeX + _originX, _printY + _originY + offY);
    _writeX = _writeX + _currentGraphicsBuffer.context.measureText(txt).width;
  }
}
