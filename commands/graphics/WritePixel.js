function _writepixel(x, y, argb, buffer = _graphicsBuffer) {
	if (buffer.context) {
		buffer.context.fillStyle = argb;
		buffer.context.fillRect(x + _originX, y + _originY, 1, 1);
	}
}