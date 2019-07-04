function _handleimage(image, x, y) {
	for (let i = 0, _length = image.length; i < _length; i++) {
		image[i].x = -x;
		image[i].y = -y;
	}
}