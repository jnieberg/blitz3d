function _copyrect(x, y, width, height, x2, y2, buffer = _graphicsBuffer, buffer2 = buffer) {
	if (buffer.context && buffer2.context && !buffer.locked && !buffer2.locked) {
		buffer2.context.drawImage(buffer.canvas, x + _originX, y + _originY, width, height, x2 + _originX, y2 + _originY, width, height);
	}
}