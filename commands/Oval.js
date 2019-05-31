function _oval(x, y, w, h, solid) {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = _colorRGB;
		_graphicsContext.strokeStyle = _colorRGB;
		_graphicsContext.beginPath();
		_graphicsContext.ellipse(x + w / 2 + _originX, y + h / 2 + _originY, w / 2, h / 2, 0, 0, 2 * Math.PI);
		if (solid) {
			_graphicsContext.fill();
		} else {
			_graphicsContext.stroke();
		}
	}
}