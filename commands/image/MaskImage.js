function _maskimage(image, red, green, blue) {
	for (let i = 0, _length = image.length; i < _length; i++) {
		const imageData = image[i].context.getImageData(0, 0, image[i].canvas.width, image[i].canvas.height);
		const data = imageData.data;
		for (let i = 0, _length = data.length; i < _length; i += 4) {
			if (data[i] === red && data[i + 1] === green && data[i + 2] === blue) {
				data[i + 3] = 0;
			} else {
				data[i + 3] = 255;
			}
		}
		image[i].context.putImageData(imageData, 0, 0);
	}
}