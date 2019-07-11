function _writepixel(x, y, argb, buffer = _graphicsBuffer) {
	if (buffer.context) {
		const rgb = (0xFFFFFFFF + argb + 1).toString(16).toUpperCase().substring(3).match(/.{1,2}/g).map(res => parseInt(res, 16));
		buffer.context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
		buffer.context.fillRect(x + _originX, y + _originY, 1, 1);
		if (buffer.image) {
			_writepixelfast(x, y, argb, buffer);
		}
	}
}