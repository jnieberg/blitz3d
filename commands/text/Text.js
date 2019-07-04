function _text(x = 0, y = 0, txt = 0 || '', centerX, centerY) {
	if (_graphicsBuffer.context) {
		if (txt instanceof Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			txt = _roundFloat(txt);
		}
		if (centerX) {
			_graphicsBuffer.context.textAlign = 'center';
		}
		if (centerY) {
			_graphicsBuffer.context.textBaseline = 'middle';
		}
		_graphicsBuffer.context.fillStyle = _colorRGB();
		_graphicsBuffer.context.fillText(txt, x + _originX, y + _originY);
		_graphicsBuffer.context.textAlign = 'left';
		_graphicsBuffer.context.textBaseline = 'top';
	}
}
