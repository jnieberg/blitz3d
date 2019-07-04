function _drawblockrect(image, x, y, x2, y2, width, height, frame = 0, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context) {
		buffer.context.fillStyle = 'rgb(0, 0, 0)';
		buffer.context.fillRect(x + _originX, y + _originY, width, height);
		buffer.context.drawImage(image[frame].canvas, x2 + _originX, y2 + _originY, width, height, x + _originX, y + _originY, width, height);
	}
}