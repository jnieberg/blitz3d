var _graphicsCanvas;
var _graphicsContext;
var _graphicsFontSize = 16;
function Graphics(width, height, colours, mode) {
	const canvasOld = document.querySelector('#blitz');
	if (canvasOld) {
		canvasOld.remove();
	}
	document.body.innerHTML = '<canvas id="blitz" width="' + width + '" height="' + height + '"></canvas><pre id="console"></pre>';
	_graphicsCanvas = document.querySelector('#blitz');
	_graphicsContext = _graphicsCanvas.getContext('2d');
	_graphicsContext.fillStyle = 'black';
	_graphicsContext.fillRect(0, 0, _graphicsCanvas.width, _graphicsCanvas.height);
	_graphicsContext.fillStyle = 'white';
	_graphicsContext.font = _graphicsFontSize + 'px Arial';
	_graphicsContext.textBaseline = 'top';
}
Graphics(800, 600, 32, 1);
