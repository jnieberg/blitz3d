function _color(r, g, b) {
	_getColorRed = r;
	_getColorGreen = g;
	_getColorBlue = b;
}

function _colorRGB() {
	return 'rgb(' + _getColorRed + ', ' + _getColorGreen + ', ' + _getColorBlue + ')';
}