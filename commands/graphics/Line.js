function _line(x1, y1, x2, y2) {
	_graphicsContext.strokeStyle = _colorRGB;
	_graphicsContext.beginPath();
	_graphicsContext.moveTo(x1 + _originX, y1 + _originY);
	_graphicsContext.lineTo(x2 + _originX, y2 + _originY);
	_graphicsContext.stroke();
}
