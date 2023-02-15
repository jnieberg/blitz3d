var _backupScreenImg = undefined;
function _saveScreen(buffer = _currentGraphicsBuffer) {
  _backupScreenImg = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}

function _loadScreen(xOff, yOff, buffer = _currentGraphicsBuffer) {
  const x = xOff || 0;
  const y = yOff || 0;
  if (!_backupScreenImg) {
    _saveScreen(buffer);
  }
  _cls(buffer);
  buffer.context.putImageData(_backupScreenImg, x, y);
}

function _refreshClass(Cls) {
  window["_var_" + Cls.name].map((res, index) => (res._index = index));
}

function _roundFloat(float) {
  return parseFloat(float.toPrecision(8));
}

var _eventHandlers = {};
function _addListener(event, handler, id = "anonymous", node = document) {
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
function _removeListener(event, id = "anonymous", node = document) {
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

function _reverseString(string) {
  return string.split("").reduce((reversed, character) => character + reversed, "");
}
function _string2bytes(string, length) {
  return string
    .split("")
    .slice(-length)
    .map((byte) => byte.charCodeAt(0));
}
function _bytes2string(bytes, length) {
  return bytes
    .map((byte) => String.fromCharCode(byte))
    .slice(-length)
    .join("");
}
// function _int2string(integer, length = 4) {
// 	return _reverseString(_hex(integer, length * 2).match(/.{1,2}/g).map(result => String.fromCharCode(parseInt(result, 16))).join(''));
// }
function _int2string(integer, length = 4) {
  var ascii = "";
  for (let i = length - 1; i >= 0; i--) {
    ascii = String.fromCharCode((integer >> (8 * i)) & 255) + ascii;
  }
  return ascii;
}
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

var _asyncTimer = _millisecs();
function _async() {
  const timer = _millisecs();
  //if (timer - _asyncTimer >= 1000 / 60) {
  return new Promise((resolve, reject) => {
    _asyncTimer = timer;
    _flipSync = true;
    setTimeout(() => resolve(1));
  });
  //} else {
  //  return 1;
  //}
}

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

function _dimGetIndex(dimensions, position) {
  let len = 1;
  return position.reduce((total, num, index) => {
    if (dimensions[index]) {
      const result = total + len * num;
      len = len * (dimensions[index] + 1);
      return result;
    }
    return 0;
  }, 0);
}

class _Float {
  constructor(float) {
    const result = float !== null && typeof float !== "undefined" && typeof float.value !== "undefined" ? float.value : parseFloat(float) || 0.0;
    this.float = result.toPrecision(8).replace(/([^\.])0+$/, "$1");
  }
  get value() {
    return parseFloat(this.float);
  }
  set value(float) {
    const result = float !== null && typeof float !== "undefined" && typeof float.value !== "undefined" ? float.value : parseFloat(float) || 0.0;
    this.float = result.toPrecision(8).replace(/([^\.])0+$/, "$1");
  }
  valueOf = () => {
    return this.value;
  };
}

// class _dim {
//   dimensions;
//   array;

//   constructor() {
//     const dimensions = [...arguments];
//     this.dimensions = dimensions;
//     this.array = this._newArray(dimensions);
//   }

//   _newArray(dimensions, array = []) {
//     let arr;
//     let rest;
//     if (dimensions.length > 0) {
//       const len = dimensions[0];
//       rest = dimensions.slice(1);
//       arr = [];
//       for (let d = 0; d <= len; d++) {
//         arr[d] = this._newArray(rest, array);
//       }
//     } else {
//       arr = 0;
//     }
//     return arr;
//   }

//   _getArray(array, indices) {
//     var returnValue = 0;
//     if (indices.length === 0) {
//       returnValue = array;
//     } else {
//       const index = Math.floor(indices[0].valueOf());
//       if (array[index]) {
//         returnValue = this._getArray(array[index], indices.slice(1));
//       }
//     }
//     return returnValue;
//   }

//   _get() {
//     const position = [...arguments];
//     let result = this._getArray(this.array, position);
//     return isNaN(result) ? result : Number(result);
//   }
// }

class _Obj {
  _object;

  constructor(obj = 0) {
    this._object = obj;
  }

  valueOf = () => {
    return this._object;
  };
}
