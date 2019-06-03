var _writeX = 0;
function _write(txt = '') {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, _printX + _writeX + _originX, _printY + _originY);
		_writeX = _writeX + _graphicsContext.measureText(txt).width;
	}
}
