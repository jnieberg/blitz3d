function _rotateimage(image, value) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].rotate = value * Math.PI / 180;
		}
	}
}