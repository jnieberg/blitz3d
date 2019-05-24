function text(x = 0, y = 0, txt = '', centerX) {
	if (_graphicsContext) {
		if (centerX) {
			_graphicsContext.textAlign = 'center';
		}
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(txt, x, y);
		_graphicsContext.textAlign = 'left';
	}
}
