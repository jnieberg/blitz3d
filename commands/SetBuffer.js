var _setBufferCanvas = [];
var _setBufferContext = [];
function _setbuffer(buffer = _currentBuffer()) {
	_graphicsCanvas = buffer.canvas;
	_graphicsContext = buffer.context;
}