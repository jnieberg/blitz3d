async function _loadanimimage(filename, width, height, first, count) {
	const imageSrc = await _loadimage(filename);
	const bufferSrc = imageSrc[0];
	const imageTar = _createimage(width, height, count - first);
	var c = 0;
	var x = 0;
	var y = 0;
	while (c < count) {
		if (x * width >= bufferSrc.canvas.width) {
			x = 0;
			y++;
		}
		if (c >= first) {
			_drawblockrect([bufferSrc], 0, 0, x * width, y * height, width, height, 0, false, imageTar[c - first]);
		}
		x++;
		c++;
	}
	return imageTar;
}