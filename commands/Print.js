function Print(text) {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillText(text || '', _printX, _printY);
		_printY = _printY + _graphicsFontSize * 1.25;
	}
}
