function _plot(x, y) {
	if (_graphicsBuffer.context && !_graphicsBuffer.locked) {
		_graphicsBuffer.context.fillStyle = _colorRGB();
		_graphicsBuffer.context.fillRect(x + _originX, y + _originY, 1, 1);
	}
}