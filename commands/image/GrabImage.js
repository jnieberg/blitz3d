function _grabimage(image, x, y, frame = 0, buffer = _graphicsBuffer) {
	_drawblockrect([buffer], 0, 0, x, y, image[frame].canvas.width, image[frame].canvas.height, frame, false, image[frame]);
}