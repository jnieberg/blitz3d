function _drawblock(image, x, y, frame = 0, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context) {
		buffer.context.fillStyle = 'rgb(0, 0, 0)';
		buffer.context.fillRect(x + _originX, y + _originY, image[frame].canvas.width, image[frame].canvas.height);
		buffer.context.drawImage(image[frame].canvas, x + _originX, y + _originY);
	}
}