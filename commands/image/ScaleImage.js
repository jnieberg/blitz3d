function _scaleimage(image, scalex, scaley) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].scaleX = scalex;
			image[i].scaleY = scaley;
		}
	}
}