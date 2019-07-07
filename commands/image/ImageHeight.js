function _imageheight(image) {
	if (image && image[0]) {
		return image[0].canvas.height;
	}
	return 0;
}