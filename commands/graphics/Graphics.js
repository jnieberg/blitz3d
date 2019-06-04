var _graphicsCanvas;
var _graphicsContext;
function _graphics(width, height, colours, mode) {
	const font = _loadfont('courier new', 13, false, false, false);
	for (let b = 0; b < 2; b++) {
		if (b === 0) {
			_graphicsCanvas = document.querySelector('#blitz');
		} else {
			_graphicsCanvas = document.createElement('canvas');
		}
		_graphicsCanvas.width = width;
		_graphicsCanvas.height = height;
		_graphicsContext = _graphicsCanvas.getContext('2d');
		_clscolor(0, 0, 0);
		_color(255, 255, 255);
		_cls();
		_setfont(font);
		_locate(0, 0);
		_graphicsContext.textBaseline = 'top';
		_graphicsContext.textAlign = 'left';
		_graphicsContext.lineWidth = 1;
		_printX = 0;
		_printY = 0;
		_writeX = 0;
		_setBufferCanvas[b] = _graphicsCanvas;
		_setBufferContext[b] = _graphicsContext;
	}
	_setbuffer(_frontbuffer());
}
