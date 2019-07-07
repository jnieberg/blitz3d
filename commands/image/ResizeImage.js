function _resizeimage(image, width, height) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].scaleX = width / image[i].canvas.width;
			image[i].scaleY = height / image[i].canvas.height;
		}
	}
}