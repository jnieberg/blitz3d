function _readfloat(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 4);
	const bytes = _string2bytes(string, 4);

	const buf = new ArrayBuffer(4);
	const view = new DataView(buf);
	bytes.forEach(function (b, i) {
		view.setInt8(3 - i, b);
	});
	const float = new _Float(view.getFloat32(0));
	stream.position += string.length;
	return float;
}