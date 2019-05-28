var _graphicsCanvas;
var _graphicsContext;
// var _graphicsFontSize = 13;
// var _graphicsLineHeight = _graphicsFontSize;
function _graphics(width, height, colours, mode) {
	const canvasOld = document.querySelector('#blitz');
	if (canvasOld) {
		canvasOld.remove();
	}
	document.body.innerHTML = '<canvas id="blitz" width="' + width + '" height="' + height + '"></canvas><pre id="console"></pre>';
	_graphicsCanvas = document.querySelector('#blitz');
	_graphicsContext = _graphicsCanvas.getContext('2d');
	_cls();
	font = _loadfont('courier new', 13, false, false, false);
	_setfont(font);
	_graphicsContext.textBaseline = 'top';
	_graphicsContext.textAlign = 'left';
}
_graphics(400, 300, 32, 1);
