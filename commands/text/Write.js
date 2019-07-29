var _writeX = 0;
function _write(txt = 0 || '') {
	if (_graphicsBuffer.context) {
		if (txt instanceof _Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			txt = _roundFloat(txt);
		}
		const offY = _setFontCurrent.height - _setFontCurrent.size;
		_graphicsBuffer.context.fillStyle = _colorRGB();
		_graphicsBuffer.context.fillText(txt, _printX + _writeX + _originX, _printY + _originY + offY);
		_writeX = _writeX + _graphicsBuffer.context.measureText(txt).width;
	}
}
