function _imagesoverlap(image, x, y, image2, x2, y2, frame = 0, frame2 = 0) {
	if (image && image[frame] && image2 && image2[frame2]) {
		return x - image[frame].canvas.width / 2 < x2 + image2[frame2].canvas.width / 2 &&
			x + image[frame].canvas.width / 2 >= x2 - image2[frame2].canvas.width / 2 &&
			y - image[frame].canvas.height / 2 < y2 + image2[frame2].canvas.height / 2 &&
			y + image[frame].canvas.height / 2 >= y2 - image2[frame2].canvas.height / 2 ? 1 : 0;
	}
	return 0;
}