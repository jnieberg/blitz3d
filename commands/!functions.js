var _backupScreenImg = undefined;
function _saveScreen(buffer = _currentBuffer()) {
	_backupScreenImg = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}

function _loadScreen(xOff, yOff, buffer = _currentBuffer()) {
	const x = xOff || 0;
	const y = yOff || 0;
	if (!_backupScreenImg) {
		_saveScreen(buffer);
	}
	_cls(buffer);
	buffer.context.putImageData(_backupScreenImg, x, y);
}

function _refreshClass(Cls) {
	window['_var_' + Cls.name].map((res, index) => res._index = index);
}

function _currentBuffer() {
	return _frontbuffer().canvas === _graphicsCanvas ? _frontbuffer() : _backbuffer();
}

function _roundFloat(float) {
	return parseFloat(float.toPrecision(6)); //Math.round(float * 1000000) / 1000000;
}

var _eventHandlers = {};
function _addListener(event, handler, id = 'anonymous') {
	const node = document;//document.querySelector('#blitz');
	if (!(node in _eventHandlers)) {
		// _eventHandlers stores references to nodes
		_eventHandlers[node] = {};
	}
	if (!(event in _eventHandlers[node])) {
		// each entry contains another entry for each event type
		_eventHandlers[node][event] = {};
	}
	if (!(id in _eventHandlers[node][event])) {
		// each entry contains another entry for each event type
		_eventHandlers[node][event][id] = handler;
		node.addEventListener(event, handler, false);
	}
}
function _removeListener(event, id) {
	const node = document;//document.querySelector('#blitz');
	if (node in _eventHandlers) {
		var handlers = _eventHandlers[node];
		if (event in handlers) {
			var eventHandlers = handlers[event];
			if (id in eventHandlers) {
				var idHandler = eventHandlers[id];
				//for (var i = idHandlers.length; i--;) {
				node.removeEventListener(event, idHandler, false);
				//}
			}
		}
	}
}
function _lockPointer() {
	if (document.pointerLockElement !== _eventCanvas) {
		_eventCanvas.requestPointerLock();
	}
}

class Float {
	constructor(float) {
		const result = float && float.value ? float.value : float || 0.0;
		this.float = result.toPrecision(6).replace(/([^\.])0+$/, '$1');
	}

	get value() {
		return parseFloat(this.float);
	}

	set value(float) {
		const result = float && float.value ? float.value : float || 0.0;
		this.float = result.toPrecision(6).replace(/([^\.])0+$/, '$1');
	}
}