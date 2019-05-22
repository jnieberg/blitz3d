var _setFontCurrent = '';

function SetFont(font) {
	if (_graphicsContext) {
		_setFontCurrent = font;
		_graphicsContext.font = font;
	}
}
