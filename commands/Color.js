var _colorRGB = 'rgb(255, 255, 255)';
function color(r, g, b) {
	if (_graphicsContext) {
		_colorRGB = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
}
