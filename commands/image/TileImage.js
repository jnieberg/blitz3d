function _tileimage(image, x = 0, y = 0, frame = 0, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
		const pattern = buffer.context.createPattern(image[frame].canvas, 'repeat');
		buffer.context.translate(x + _originX - image[frame].x, y + _originY - image[frame].y);
		buffer.context.rect(-x, -y, buffer.canvas.width - _originX + image[frame].x, buffer.canvas.height - _originY + image[frame].y);
		buffer.context.fillStyle = pattern;
		buffer.context.fill();
		buffer.context.translate(-(x + _originX - image[frame].x), -(y + _originY - image[frame].y));
	}
}