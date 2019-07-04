function _readpixel(x, y, buffer = _graphicsBuffer) {
	if (buffer.context) {
		var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
		return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
	}
}