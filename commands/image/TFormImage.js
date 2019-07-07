function _tformimage(image, a, b, c, d) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].transform11 = a;
			image[i].transform12 = b;
			image[i].transform21 = c;
			image[i].transform22 = d;
		}
	}
}