var _backupScreenImg = undefined;
function _saveScreen(buffer = _graphicsBuffer) {
	_backupScreenImg = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}

function _loadScreen(xOff, yOff, buffer = _graphicsBuffer) {
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

function _roundFloat(float) {
	return parseFloat(float.toPrecision(8));
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

var _asyncTimer = _millisecs();
function _async() {
	const timer = _millisecs();
	if (timer - _asyncTimer >= 1000 / 60) {
		return new Promise((resolve, reject) => {
			_asyncTimer = timer;
			_flipSync = true;
			setTimeout(() => {
				resolve(1);
			});
		});
	} else {
		return 1;
	}
}

function _getCommand(command, arguments) {
	return new Promise((resolve, reject) => {
		var http = new XMLHttpRequest();
		var query = arguments ? '?' + encodeURI(arguments) : '';
		if (typeof arguments === 'object') {
			query = '?' + JSON.stringify(query);
		}
		http.open('GET', `/_${command}${query}`, true);
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

function _postCommand(command, arguments = {}) {
	return new Promise((resolve, reject) => {
		var http = new XMLHttpRequest();
		http.open('POST', `/_${command}`, true);
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

function _bufferEditable(buffer = _graphicsBuffer) {
	return buffer && buffer.context && !buffer.locked;
}

function _dimGetIndex(dimensions, position) {
	let len = 1;
	return position.reduce((total, num, index) => {
		const result = total + len * num;
		len = len * (dimensions[index] + 1);
		return result;
	}, 0);
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

class Dim {
	_dimensions;
	_array;

	constructor() {
		const dimensions = [...arguments];
		this._dimensions = dimensions;
		this._array = this._newArray(dimensions);
	}

	_newArray(dimensions, array = []) {
		let arr;
		let rest;
		if (dimensions.length > 0) {
			const len = dimensions[0];
			rest = dimensions.slice(1);
			arr = [];
			for (let d = 0; d <= len; d++) {
				arr[d] = this._newArray(rest, array);
			}
		} else {
			arr = 0;
		}
		return arr;
	}

	_getArray(array, indices) {
		var returnValue;
		if (indices.length === 0) {
			returnValue = array;
		} else {
			returnValue = this._getArray(array[indices[0]], indices.slice(1));
		}
		return returnValue;
	}

	_get() {
		const position = [...arguments];
		return this._getArray(this._array, position);
	}
}