function _cls(buffer = _currentBuffer()) {
	if (buffer.context) {
		buffer.context.fillStyle = _clsColorRGB;
		buffer.context.fillRect(0, 0, _graphicsCanvas.width, _graphicsCanvas.height);
		buffer.context.fillStyle = _colorRGB;
	}
}
