function _print(txt = '', fix) {
	if (_graphicsContext) {
		if (_printY + _setFontCurrent.height > _graphicsCanvas.height) {
			_saveScreen();
			_loadScreen(0, -_setFontCurrent.height);
			_printY = _printY - _setFontCurrent.height;
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, _printX + _originX, _printY + _originY);
		if (!fix) {
			_printY = _printY + _setFontCurrent.height;
		}
	}
}
