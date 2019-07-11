function _print(txt = 0 || '', fix) {
	if (_graphicsBuffer.context) {
		if (txt instanceof Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			if (txt.toString().indexOf('.') > -1) {
				txt = _roundFloat(txt);
			}
		}
		if (_printY + _setFontCurrent.height > _graphicsBuffer.canvas.height) {
			_saveScreen();
			_loadScreen(0, -_setFontCurrent.height);
			_printY = _printY - _setFontCurrent.height;
		}
		_graphicsBuffer.context.fillStyle = _colorRGB();
		_graphicsBuffer.context.fillText(txt, _printX + _writeX + _originX, _printY + _originY);
		if (!fix) {
			_printY = _printY + _setFontCurrent.height;
			_printX = 0;
		}
		_writeX = 0;
	}
}
