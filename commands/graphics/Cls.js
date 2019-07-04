function _cls(buffer = _graphicsBuffer) {
	if (buffer.context && !buffer.locked) {
		buffer.context.fillStyle = _clsColorRGB;
		buffer.context.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
	}
}
