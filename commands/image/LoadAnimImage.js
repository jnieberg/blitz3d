async function _loadanimimage(filename, width, height, first, count) {
	const image = await _loadimage(filename);
	const buffer = image[0];
	const handle2 = _createimage(width, height, count - first);
	for (let i = first; i < count; i++) {
		handle2[i - first].context.drawImage(buffer.canvas, i * width, 0, width, height, 0, 0, width, height);
	}
	return handle2;
}