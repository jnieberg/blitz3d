function _writepixel(x, y, argb, buffer = _currentBuffer()) {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = argb;
		_graphicsContext.fillRect(x + _originX, y + _originY, 1, 1);
	}
}