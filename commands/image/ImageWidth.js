function _imagewidth(image) {
	if (image && image[0]) {
		return image[0].canvas.width;
	}
	return 0;
}