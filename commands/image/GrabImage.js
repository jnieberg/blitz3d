function _grabimage(image, x, y, frame = 0, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context) {
		image[frame].context.drawImage(buffer.canvas, x + _originX, y + _originY, image[frame].canvas.width, image[frame].canvas.height, 0, 0, image[frame].canvas.width, image[frame].canvas.height)
	}
}