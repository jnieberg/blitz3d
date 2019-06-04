function _print(txt = 0 || '', fix) {
	if (_graphicsContext) {
		if (txt instanceof Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			txt = _roundFloat(txt);
		}
		if (_printY + _setFontCurrent.height > _graphicsCanvas.height) {
			_saveScreen();
			_loadScreen(0, -_setFontCurrent.height);
			_printY = _printY - _setFontCurrent.height;
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, _printX + _writeX + _originX, _printY + _originY);
		if (!fix) {
			_printY = _printY + _setFontCurrent.height;
		}
		_writeX = 0;
	}
}
