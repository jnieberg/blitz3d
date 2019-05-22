var _colorRGB = 'rgb(255, 255, 255)';
function Color(r, g, b) {
	if (_graphicsContext) {
		_colorRGB = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		// _graphicsContext.fillStyle = _colorRGB;
		// _graphicsContext.strokeStyle = _colorRGB;
	}
}
