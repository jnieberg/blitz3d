function _writepixelfast(x, y, argb, buffer = _graphicsBuffer) {
	if (buffer.context && buffer.locked) {
		const rgb = (0xFFFFFFFF + argb + 1).toString(16).toUpperCase().substring(3).match(/.{1,2}/g).map(res => parseInt(res, 16));
		var index = _dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
		buffer.image.data[index + 0] = rgb[0];
		buffer.image.data[index + 1] = rgb[1];
		buffer.image.data[index + 2] = rgb[2];
		buffer.image.data[index + 3] = 255;
	}
}