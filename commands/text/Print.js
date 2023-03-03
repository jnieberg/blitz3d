function _print1(/** @type {_Float | boolean | number | string} */ txt = "", /** @type {boolean} */ fix = false, buffer = _frontbuffer()) {
  if (buffer.context) {
    // if (txt instanceof _Float) {
    //   txt = txt.float;
    // } else if (typeof txt === "number") {
    //   if (txt.toString().indexOf(".") > -1) {
    //     txt = _roundFloat(txt);
    //   }
    // }
    if (!fix && _printY + _setFontCurrent.height * 0.5 > buffer.canvas.height) {
      _saveScreen(buffer);
      _loadScreen(0, -_setFontCurrent.height, buffer);
      _printY = _printY - _setFontCurrent.height;
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    buffer.context.fillStyle = _colorRGB();
    buffer.context.fillText(`${txt}`, _printX + _writeX + _originX, _printY + _originY + offY);
    if (!fix) {
      _printY = _printY + _setFontCurrent.height;
      _printX = 0;
    }
    _writeX = 0;
  }
}
function _print(/** @type {any[]} */ ...txt) {
  const txtjoin = txt.join("");
  _print1(txtjoin, true, _backbuffer());
  _print1(txtjoin);
}
