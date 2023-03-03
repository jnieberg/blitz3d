/**
 * @type {ImageData}
 */
var _backupScreenImg = undefined;
function _saveScreen(buffer = _currentGraphicsBuffer) {
  _backupScreenImg = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}

/**
 * @param {number} [xOff]
 * @param {number} [yOff]
 */
function _loadScreen(xOff, yOff, buffer = _currentGraphicsBuffer) {
  const x = xOff || 0;
  const y = yOff || 0;
  if (!_backupScreenImg) {
    _saveScreen(buffer);
  }
  _cls(buffer, false);
  buffer.context.putImageData(_backupScreenImg, x, y);
}

/**
 * @param {number} float
 */
function _roundFloat(float) {
  return parseFloat(float.toPrecision(8));
}

/**
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {Document} node
 */
function _addListener(event, handler, id = "anonymous", node = document) {
  const name = node.nodeName;
  if (!(name in _eventHandlers)) {
    // _eventHandlers stores references to nodes
    _eventHandlers[name] = {};
  }
  if (!(event in _eventHandlers[name])) {
    // each entry contains another entry for each event type
    _eventHandlers[name][event] = {};
  }
  if (!(id in _eventHandlers[name][event])) {
    // each entry contains another entry for each event type
    _eventHandlers[name][event][id] = handler;
    node.addEventListener(event, handler, false);
  }
}
/**
 * @param {string} event
 */
function _removeListener(event, id = "anonymous", node = document) {
  const name = node.nodeName;
  if (name in _eventHandlers) {
    var handlers = _eventHandlers[name];
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

/**
 * @param {string} string
 */
function _reverseString(string) {
  return string.split("").reduce((/** @type {any} */ reversed, /** @type {any} */ character) => character + reversed, "");
}
/**
 * @param {string} string
 * @param {number} length
 */
function _string2bytes(string, length) {
  return string
    .split("")
    .slice(-length)
    .map((/** @type {string} */ byte) => byte.charCodeAt(0));
}
/**
 * @param {any[]} bytes
 * @param {number} length
 */
function _bytes2string(bytes, length) {
  return bytes
    .map((/** @type {number} */ byte) => String.fromCharCode(byte))
    .slice(-length)
    .join("");
}
// function _int2string(integer, length = 4) {
// 	return _reverseString(_hex(integer, length * 2).match(/.{1,2}/g).map(result => String.fromCharCode(parseInt(result, 16))).join(''));
// }
/**
 * @param {number} integer
 */
function _int2string(integer, length = 4) {
  var ascii = "";
  for (let i = length - 1; i >= 0; i--) {
    ascii = String.fromCharCode((integer >> (8 * i)) & 255) + ascii;
  }
  return ascii;
}
/**
 * @param {string} numString
 */
function _string2int(numString) {
  var result = 0;
  for (let i = numString.length - 1; i >= 0; i--) {
    result += numString.charCodeAt(i) << (8 * i);
  }
  return result;
}
// function _string2int(string) {
// 	return parseInt((_reverseString(string).match(/[\w\W]/g) || []).map((result, index) => _hex(result.charCodeAt(0) || 0, 2)).join(''), 16);
// }

function _async() {
  // if (_millisecs() - _asyncTimer >= 0) {
  return new Promise((resolve, reject) => {
    // _asyncTimer = _millisecs();
    _flipSync = true;
    setTimeout(() => {
      resolve(1);
    });
  });
  // } else {
  //   return 1;
  // }
}

/**
 * @param {string} command
 * @param {string} [arguments]
 */
function _getCommand(command, arguments) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();
    var query = arguments ? "?" + encodeURI(arguments) : "";
    if (typeof arguments === "object") {
      query = "?" + JSON.stringify(query);
    }
    http.open("GET", `/_${command}${query}`, true);
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        let data = http.responseText;
        try {
          data = JSON.parse(data);
        } catch (err) {}
        resolve(data);
      }
    };
    http.onerror = () => {
      resolve();
    };
    http.send();
  });
}

/**
 * @param {string} command
 */
function _postCommand(command, arguments = {}) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();
    http.open("POST", `/_${command}`, true);
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        let data = http.responseText;
        try {
          data = JSON.parse(data);
        } catch (err) {}
        resolve(data);
      }
    };
    http.onerror = () => {
      resolve();
    };
    http.send(JSON.stringify(arguments));
  });
}

/**
 * @param {string} filename
 */
function _normalizeFile(filename) {
  let newPath = _currentDirCached + "/" + filename;
  if (filename.indexOf("/") === 0 || filename.indexOf("\\") === 0) {
    newPath = filename;
  }
  newPath = newPath.replace(/[\\\/]+/g, "/").replace(/(\\.*?)\\\.\./g, "$1");
  return newPath;
}

function _bufferEditable(buffer = _currentGraphicsBuffer) {
  return buffer && buffer.context && !buffer.locked;
}

/**
 * @param {number[]} dimensions
 * @param {any[]} position
 */
function _dimGetIndex(dimensions, position) {
  let len = 1;
  return position.reduce((/** @type {number} */ total, /** @type {number} */ num, /** @type {number} */ index) => {
    if (dimensions[index]) {
      const result = total + len * num;
      len = len * (dimensions[index] + 1);
      return result;
    }
    return 0;
  }, 0);
}

/**
 * @param {string | number} val
 */
function _tofloat(val) {
  return typeof val !== "string" && typeof val !== "object" ? new _Float(val) : val;
}

/**
 * @param {string | number} val
 */
function _tostring(val) {
  if (typeof val === "undefined") return "";
  return typeof val !== "number" && typeof val !== "object" ? `${val}` : val;
}

/**
 * @param {string | number} val
 */
function _toint(val) {
  if (typeof val === "undefined") return 0;
  return typeof val !== "string" && typeof val !== "object" ? parseInt(`${val}`) : val;
}

class _Float {
  float = "0.0";
  constructor(/** @type {string | number} */ float) {
    this.float = (typeof float === "undefined" ? 0.0 : parseFloat(`${float}`))
      .toPrecision(8)
      .replace(/(?<=\.)0+$/, "0")
      .replace(/(?<=\.\d+?)0+$/, "");
  }
  valueOf = () => {
    return parseFloat(this.float);
  };
  toString = () => {
    return this.float;
  };
}

class _Obj {
  _object;
  constructor(obj = 0) {
    this._object = obj;
  }
}

class _Type {
  _index = -1;
  /**
   * @typedef {any} Fields
   * @type {Fields[]}
   */
  _sub = [];
  /**
   * @type {Fields}
   */
  _obj = {};
  /**
   * @param {Fields} obj
   */
  constructor(obj) {
    this._sub = [];
    this._obj = obj;
    this._type = this;
  }
}
