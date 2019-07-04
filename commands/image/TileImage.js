function _tileimage(image, x = 0, y = 0, frame = 0, buffer = _graphicsBuffer) {
	if (buffer.context && !buffer.locked) {
		buffer.context.drawImage(image[frame].canvas, x + _originX, y + _originY);
	}
}