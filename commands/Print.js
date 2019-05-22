var _printX = 0;
var _printY = 0;
function Print(text) {
	if (_graphicsContext) {
		_graphicsContext.textBaseline = 'top';
		_graphicsContext.textAlign = 'left';
		_graphicsContext.fillText(text, _printX, _printY);
		_printY = _printY + _graphicsFontSize * 1.25;
	}
}
