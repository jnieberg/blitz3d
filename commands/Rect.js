function Rect(x, y, w, h, solid) {
	if (solid) {
		_graphicsContext.fillRect(x, y, w, h);
	} else {
		_graphicsContext.beginPath();
		_graphicsContext.lineWidth = '1';
		_graphicsContext.rect(x, y, w, h);
		_graphicsContext.stroke();
	}
}
