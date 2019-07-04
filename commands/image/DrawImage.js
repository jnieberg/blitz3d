function _drawimage(image, x, y, frame = 0, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context) {
		buffer.context.drawImage(image[frame].canvas, x + _originX + image[frame].x, y + _originY + image[frame].y);
	}
}