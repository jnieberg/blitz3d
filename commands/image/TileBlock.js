function _tileblock(image, x = 0, y = 0, frame = 0, buffer = _graphicsBuffer) {
	if (buffer.context && !buffer.locked) {
		buffer.context.fillStyle = 'rgb(0, 0, 0)';
		buffer.context.fillRect(x + _originX, y + _originY, image[frame].canvas.width, image[frame].canvas.height);
		buffer.context.drawImage(image[frame].canvas, x + _originX, y + _originY);
	}
}