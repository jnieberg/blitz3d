function _writepixelfast(x, y, argb, buffer = _graphicsBuffer) {
	if (buffer.context && buffer.locked) {
		let colorSplit = argb.split(/[\(\),]/g);
		const color = [Number(colorSplit[1]), Number(colorSplit[2]), Number(colorSplit[3]), Number(colorSplit[4]) * 255];
		var index = _dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
		buffer.image.data[index + 0] = color[0];
		buffer.image.data[index + 1] = color[1];
		buffer.image.data[index + 2] = color[2];
		buffer.image.data[index + 3] = color[3];
	}
}