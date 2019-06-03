function _text(x = 0, y = 0, txt = 0 || '', centerX) {
	if (_graphicsContext) {
		if (typeof txt === 'number') {
			txt = Math.round(txt * 10000) / 10000;
		}
		if (centerX) {
			_graphicsContext.textAlign = 'center';
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, x + _originX, y + _originY);
		_graphicsContext.textAlign = 'left';
	}
}
