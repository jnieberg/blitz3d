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
	return parseFloat(float.toPrecision(8)); //Math.round(float * 1000000) / 1000000;
}

var _eventHandlers = {};
function _addListener(event, handler, id = 'anonymous', node = document) {
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
function _removeListener(event, id = 'anonymous', node = document) {
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

function _string2bytes(string, length) {
	return string.split('').slice(-length).map(byte => byte.charCodeAt(0));
}
function _bytes2string(bytes, length) {
	return bytes.map(byte => String.fromCharCode(byte)).slice(-length).join('');
}
function _int2string(integer, length = 4) {
	return _hex(integer, length * 2).match(/.{1,2}/g).map(result => String.fromCharCode(parseInt(result, 16))).join('');
}
function _string2int(string) {
	return parseInt((string.match(/[\w\W]/g) || []).map((result, index) => _hex(result.charCodeAt(0) || 0, 2)).join(''), 16);
}
function _array2string(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function _string2array(str) {
	var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

function _loopforever() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		});
	});
}

function _getCommand(command, arguments) {
	return new Promise((resolve, reject) => {
		var http = new XMLHttpRequest();
		var query = encodeURI(arguments);
		if (typeof arguments === 'object') {
			query = JSON.stringify(query);
		}
		http.open('GET', `_${command}?${query}`, true);
		http.onreadystatechange = () => {
			if (http.readyState === 4) {
				let data = http.responseText;
				try {
					data = JSON.parse(data);
				} catch (err) { }
				resolve(data);
			}
		}
		http.onerror = () => {
			resolve();
		}
		http.send();
	});
}

function _postCommand(command, arguments) {
	return new Promise((resolve, reject) => {
		var http = new XMLHttpRequest();
		http.open('POST', `_${command}`, true);
		http.onreadystatechange = () => {
			if (http.readyState === 4) {
				let data = http.responseText;
				try {
					data = JSON.parse(data);
				} catch (err) { }
				resolve(data);
			}
		}
		http.onerror = () => {
			resolve();
		}
		http.send(JSON.stringify(arguments));
	});
}

class Float {
	constructor(float) {
		const result = float !== null && typeof float !== 'undefined' && typeof float.value !== 'undefined' ? float.value : float || 0.0;
		this.float = result.toPrecision(8).replace(/([^\.])0+$/, '$1');
	}
	get value() {
		return parseFloat(this.float);
	}
	set value(float) {
		const result = float !== null && typeof float !== 'undefined' && typeof float.value !== 'undefined' ? float.value : float || 0.0;
		this.float = result.toPrecision(8).replace(/([^\.])0+$/, '$1');
	}
	valueOf = () => {
		return this.value;
	};
}