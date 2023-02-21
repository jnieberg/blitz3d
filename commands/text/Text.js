function _text(x = 0, y = 0, txt = "", centerX = false, centerY = false) {
  if (_currentGraphicsBuffer.context) {
    if (txt instanceof _Float) {
      txt = txt.float;
    } else if (typeof txt === "number") {
      txt = _roundFloat(txt);
    }
    if (centerX) {
      _currentGraphicsBuffer.context.textAlign = "center";
    }
    if (centerY) {
      _currentGraphicsBuffer.context.textBaseline = "middle";
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillText(txt, x + _originX, y + _originY + offY);
    _currentGraphicsBuffer.context.textAlign = "left";
    _currentGraphicsBuffer.context.textBaseline = "top";
  }
}
