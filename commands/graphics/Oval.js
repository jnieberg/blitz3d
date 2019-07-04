function _oval(x, y, w, h, solid) {
	if (_bufferEditable()) {
		_graphicsBuffer.context.fillStyle = _colorRGB();
		_graphicsBuffer.context.strokeStyle = _colorRGB();
		_graphicsBuffer.context.beginPath();
		_graphicsBuffer.context.ellipse(x + w / 2 + _originX, y + h / 2 + _originY, w / 2, h / 2, 0, 0, 2 * Math.PI);
		if (solid) {
			_graphicsBuffer.context.fill();
		} else {
			_graphicsBuffer.context.stroke();
		}
	}
}