function _rect(x, y, w, h, solid = true) {
	if (_graphicsBuffer.context && w > 0 && h > 0) {
		if (solid) {
			_graphicsBuffer.context.fillStyle = _colorRGB();
			_graphicsBuffer.context.fillRect(x + _originX, y + _originY, w, h);
		} else {
			_graphicsBuffer.context.translate(0.5, 0.5);
			_graphicsBuffer.context.strokeStyle = _colorRGB();
			_graphicsBuffer.context.beginPath();
			_graphicsBuffer.context.rect(x + _originX, y + _originY, w - 1, h - 1);
			_graphicsBuffer.context.stroke();
			_graphicsBuffer.context.translate(-0.5, -0.5);
		}
	}
}
