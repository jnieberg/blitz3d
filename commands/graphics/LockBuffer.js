function _lockbuffer(buffer = _graphicsBuffer) {
	buffer.locked = true;
	buffer.image = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}