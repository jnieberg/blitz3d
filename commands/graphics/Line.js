function _line(x1, y1, x2, y2) {
	if (_bufferEditable()) {
		_graphicsBuffer.context.strokeStyle = _colorRGB();
		_graphicsBuffer.context.beginPath();
		_graphicsBuffer.context.moveTo(x1 + _originX, y1 + _originY);
		_graphicsBuffer.context.lineTo(x2 + _originX, y2 + _originY);
		_graphicsBuffer.context.stroke();
	}
}
