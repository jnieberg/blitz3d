function _rect(x, y, w, h, solid) {
	if (solid) {
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.fillRect(x + _originX, y + _originY, w, h);
	} else {
		_graphicsContext.strokeStyle = _colorRGB;
		_graphicsContext.beginPath();
		_graphicsContext.rect(x + _originX, y + _originY, w, h);
		_graphicsContext.stroke();
	}
}
