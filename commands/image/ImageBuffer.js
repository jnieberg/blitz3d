function _imagebuffer(image, frame = 0) {
	if (image && image[frame]) {
		return image[frame];
	}
	return null;
}