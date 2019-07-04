function _freeimage(image) {
	delete image;
	image = undefined;
	return image;
}