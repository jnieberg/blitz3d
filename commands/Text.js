function Text(x, y, text, centerX) {
	if (_graphicsContext) {
		if (centerX) {
			_graphicsContext.textAlign = 'center';
		}
		_graphicsContext.fillText(text, x, y);
		_printY = _printY + _graphicsFontSize * 1.25;
	}
}
