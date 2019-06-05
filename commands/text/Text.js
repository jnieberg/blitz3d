function _text(x = 0, y = 0, txt = 0 || '', centerX, centerY) {
	if (_graphicsContext) {
		if (txt instanceof Float) {
			txt = txt.float;
		} else if (typeof txt === 'number') {
			txt = _roundFloat(txt);
		}
		if (centerX) {
			_graphicsContext.textAlign = 'center';
		}
		if (centerY) {
			_graphicsContext.textBaseline = 'middle';
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, x + _originX, y + _originY);
		_graphicsContext.textAlign = 'left';
		_graphicsContext.textBaseline = 'top';
	}
}
