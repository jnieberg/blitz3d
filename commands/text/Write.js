var _writeX = 0;
function _write(txt = 0 || '') {
	if (_graphicsContext) {
		if (txt instanceof Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			txt = _roundFloat(txt);
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, _printX + _writeX + _originX, _printY + _originY);
		_writeX = _writeX + _graphicsContext.measureText(txt).width;
	}
}
