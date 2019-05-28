function _cls() {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = _clsColorRGB;
		_graphicsContext.fillRect(0, 0, _graphicsCanvas.width, _graphicsCanvas.height);
		_graphicsContext.fillStyle = _colorRGB;
	}
}
