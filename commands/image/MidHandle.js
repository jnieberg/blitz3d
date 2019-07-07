function _midhandle(image) {
	for (let i = 0, _length = image.length; i < _length; i++) {
		image[i].x = image[i].canvas.width / 2;
		image[i].y = image[i].canvas.height / 2;
	}
}