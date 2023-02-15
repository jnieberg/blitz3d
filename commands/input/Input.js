var _inputText = "";
var _inputTextCursorInterval = undefined;
var _inputTextCursorTimeout = undefined;
async function _input(input) {
  _inputText = "";
  _saveScreen();
  _print1(`${input}`, true);
  function blink() {
    _rect(
      _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width + 1,
      _printY,
      _setFontCurrent.height * 0.5,
      _setFontCurrent.height,
      true
    );
    _inputTextCursorTimeout = setTimeout(() => {
      const col = [_getColorRed, _getColorGreen, _getColorBlue];
      _color(0, 0, 0);
      _rect(
        _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width,
        _printY - 1,
        _setFontCurrent.height * 0.5 + 2,
        _setFontCurrent.height + 2,
        true
      );
      _color(col[0], col[1], col[2]);
    }, 300);
  }
  blink();
  clearInterval(_inputTextCursorInterval);
  _inputTextCursorInterval = setInterval(() => {
    blink();
  }, 600);
  while (true) {
    const key = await _waitkey(true);
    if (key === "Backspace" || key === "Delete") {
      _inputText = _inputText.slice(0, _inputText.length - 1);
    } else if (key === "Enter") {
      return new Promise((resolve, reject) => {
        clearInterval(_inputTextCursorInterval);
        clearInterval(_inputTextCursorTimeout);
        _loadScreen();
        _print1(`${input}${_inputText}`, true);
        resolve(Number(_inputText) || _inputText);
        _printY = _printY + _setFontCurrent.height;
      });
    } else if (key.length === 1) {
      _inputText = _inputText + key;
    }
    _loadScreen();
    _rect(
      _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width + 1,
      _printY,
      _setFontCurrent.height * 0.5,
      _setFontCurrent.height,
      true
    );
    _print1(`${input}${_inputText}`, true);
  }
}
