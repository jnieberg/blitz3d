var _scancode = [];
var _charcode = [];

_scancode[0] = "";
_scancode[1] = "Escape";
_scancode[2] = "Digit1";
_scancode[3] = "Digit2";
_scancode[4] = "Digit3";
_scancode[5] = "Digit4";
_scancode[6] = "Digit5";
_scancode[7] = "Digit6";
_scancode[8] = "Digit7";
_scancode[9] = "Digit8";
_scancode[10] = "Digit9";
_scancode[11] = "Digit0";
_scancode[12] = "Minus";
_scancode[13] = "Equal";
_scancode[14] = "Backspace";
_scancode[15] = "Tab";
_scancode[16] = "KeyQ";
_scancode[17] = "KeyW";
_scancode[18] = "KeyE";
_scancode[19] = "KeyR";
_scancode[20] = "KeyT";
_scancode[21] = "KeyY";
_scancode[22] = "KeyU";
_scancode[23] = "KeyI";
_scancode[24] = "KeyO";
_scancode[25] = "KeyP";
_scancode[26] = "BracketLeft";
_scancode[27] = "BracketRight";
_scancode[28] = "Enter";
_scancode[29] = "ControlLeft";
_scancode[30] = "KeyA";
_scancode[31] = "KeyS";
_scancode[32] = "KeyD";
_scancode[33] = "KeyF";
_scancode[34] = "KeyG";
_scancode[35] = "KeyH";
_scancode[36] = "KeyJ";
_scancode[37] = "KeyK";
_scancode[38] = "KeyL";
_scancode[39] = "Semicolon";
_scancode[40] = "Quote";
_scancode[41] = "Backquote";
_scancode[42] = "ShiftLeft";
_scancode[43] = "Backslash";
_scancode[44] = "KeyZ";
_scancode[45] = "KeyX";
_scancode[46] = "KeyC";
_scancode[47] = "KeyV";
_scancode[48] = "KeyB";
_scancode[49] = "KeyN";
_scancode[50] = "KeyM";
_scancode[51] = "Comma";
_scancode[52] = "Period";
_scancode[53] = "Slash";
_scancode[54] = "ShiftRight";
_scancode[55] = "NumpadMultiply";
_scancode[56] = "AltLeft";
_scancode[57] = "Space";
_scancode[58] = "CapsLock";
_scancode[59] = "F1";
_scancode[60] = "F2";
_scancode[61] = "F3";
_scancode[62] = "F4";
_scancode[63] = "F5";
_scancode[64] = "F6";
_scancode[65] = "F7";
_scancode[66] = "F8";
_scancode[67] = "F9";
_scancode[68] = "F10";
_scancode[69] = "Pause";
_scancode[70] = "ScrollLock";
_scancode[71] = "Numpad7";
_scancode[72] = "Numpad8";
_scancode[73] = "Numpad9";
_scancode[74] = "NumpadSubtract";
_scancode[75] = "Numpad4";
_scancode[76] = "Numpad5";
_scancode[77] = "Numpad6";
_scancode[78] = "NumpadAdd";
_scancode[79] = "Numpad1";
_scancode[80] = "Numpad2";
_scancode[81] = "Numpad3";
_scancode[82] = "Numpad0";
_scancode[83] = "NumpadDecimal";
_scancode[87] = "F11";
_scancode[88] = "F12";
_scancode[100] = "F13";
_scancode[101] = "F14";
_scancode[102] = "F15";
_scancode[156] = "NumpadEnter";
_scancode[157] = "RightCtrl";
_scancode[181] = "NumpadDivide";
_scancode[184] = "AltRight";
_scancode[197] = "NumLock";
_scancode[199] = "Home";
_scancode[200] = "ArrowUp";
_scancode[201] = "PageUp";
_scancode[203] = "ArrowLeft";
_scancode[205] = "ArrowRight";
_scancode[207] = "End";
_scancode[208] = "ArrowDown";
_scancode[209] = "PageDown";
_scancode[210] = "Insert";
_scancode[211] = "Delete";
_scancode[219] = "MetaLeft";
_scancode[220] = "MetaRight";
_scancode[221] = "AppsMenu";
_scancode[222] = "Power";
_scancode[223] = "Sleep";
_scancode[227] = "Wake";
_scancode[229] = "WebSearch";
_scancode[230] = "WebFavorites";
_scancode[231] = "WebRefresh";
_scancode[232] = "WebStop";
_scancode[233] = "WebForward";
_scancode[234] = "WebBack";
_scancode[235] = "MyComputer";
_scancode[236] = "Mail";
_scancode[237] = "MediaSelect";

_scancode[240] = "MouseButtonLeft";
_scancode[241] = "MouseButtonRight";
_scancode[242] = "MouseButtonMiddle";
_scancode[243] = "MouseWheelDown";
_scancode[244] = "MouseWheelUp";

_scancode[245] = "JoystickUp";
_scancode[246] = "JoystickDown";
_scancode[247] = "JoystickLeft";
_scancode[248] = "JoystickRight";
for (let j = 1; j < 7; j++) {
  _scancode[248 + j] = "JoystickButton" + j;
}

_charcode[0] = "";
_charcode[2] = "1";
_charcode[3] = "2";
_charcode[4] = "3";
_charcode[5] = "4";
_charcode[6] = "5";
_charcode[7] = "6";
_charcode[8] = "7";
_charcode[9] = "8";
_charcode[10] = "9";
_charcode[11] = "0";
_charcode[12] = "-";
_charcode[13] = "=";
_charcode[15] = "	";
_charcode[16] = "Q";
_charcode[17] = "W";
_charcode[18] = "E";
_charcode[19] = "R";
_charcode[20] = "T";
_charcode[21] = "Y";
_charcode[22] = "U";
_charcode[23] = "I";
_charcode[24] = "O";
_charcode[25] = "P";
_charcode[26] = "[";
_charcode[27] = "]";
_charcode[30] = "A";
_charcode[31] = "S";
_charcode[32] = "D";
_charcode[33] = "F";
_charcode[34] = "G";
_charcode[35] = "H";
_charcode[36] = "J";
_charcode[37] = "K";
_charcode[38] = "L";
_charcode[39] = ";";
_charcode[40] = "'";
_charcode[41] = "`";
_charcode[43] = "\\";
_charcode[44] = "Z";
_charcode[45] = "X";
_charcode[46] = "C";
_charcode[47] = "V";
_charcode[48] = "B";
_charcode[49] = "N";
_charcode[50] = "M";
_charcode[51] = ",";
_charcode[52] = ".";
_charcode[53] = "/";
_charcode[55] = "*";
_charcode[57] = " ";
_charcode[71] = "7";
_charcode[72] = "8";
_charcode[73] = "9";
_charcode[74] = "-";
_charcode[75] = "4";
_charcode[76] = "5";
_charcode[77] = "6";
_charcode[78] = "+";
_charcode[79] = "1";
_charcode[80] = "2";
_charcode[81] = "3";
_charcode[82] = "0";
_charcode[83] = ".";
_charcode[181] = "/";

const _BYTE_MAX = 256;
const _SHORT_MAX = 65536;
const _FLOAT_MAX = 65536.246;
const _INTEGER_MAX = 2147483648;

/**
 * @type {{ [x: string]: { [y: string]: { [z: string]: EventListenerOrEventListenerObject } }}}
 */
var _eventHandlers = {};

/**
 * @typedef GraphicsBuffer
 * @type {object}
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 * @property {string} id
 * @property {boolean} locked
 * @property {number} rotate
 * @property {number} scaleX
 * @property {number} scaleY
 * @property {number} transform11
 * @property {number} transform12
 * @property {number} transform21
 * @property {number} transform22
 * @property {number} x
 * @property {number} y
 * @property {number} mode
 * @property {ImageData} [image]
 */
/** @type {Object.<string, GraphicsBuffer>} */
var _graphicsBufferList = {
  _front: {
    canvas: undefined,
    context: undefined,
    id: "",
    locked: false,
    rotate: 0,
    scaleX: 0,
    scaleY: 0,
    transform11: 0,
    transform12: 0,
    transform21: 0,
    transform22: 0,
    x: 0,
    y: 0,
    mode: -1,
  },
  _back: {
    canvas: undefined,
    context: undefined,
    id: "",
    locked: false,
    rotate: 0,
    scaleX: 0,
    scaleY: 0,
    transform11: 0,
    transform12: 0,
    transform21: 0,
    transform22: 0,
    x: 0,
    y: 0,
    mode: -1,
  },
};

/** @type {GraphicsBuffer} */
var _currentGraphicsBuffer = _graphicsBufferList._front;

/** @type {number} */
var _graphicsDepth;
var _graphicsMode;
var _graphicsMidHandle = false;
var _graphicsModeList = [
  {},
  {
    width: 320,
    height: 200,
    depth: 32,
  },
  {
    width: 320,
    height: 240,
    depth: 32,
  },
  {
    width: 400,
    height: 300,
    depth: 32,
  },
  {
    width: 512,
    height: 384,
    depth: 32,
  },
  {
    width: 640,
    height: 400,
    depth: 32,
  },
  {
    width: 640,
    height: 480,
    depth: 32,
  },
  {
    width: 800,
    height: 600,
    depth: 32,
  },
  {
    width: 1024,
    height: 768,
    depth: 32,
  },
  {
    width: 1152,
    height: 864,
    depth: 32,
  },
  {
    width: 1280,
    height: 600,
    depth: 32,
  },
  {
    width: 1280,
    height: 720,
    depth: 32,
  },
  {
    width: 1280,
    height: 768,
    depth: 32,
  },
  {
    width: 1280,
    height: 800,
    depth: 32,
  },
  {
    width: 1280,
    height: 960,
    depth: 32,
  },
  {
    width: 1280,
    height: 1024,
    depth: 32,
  },
  {
    width: 1360,
    height: 768,
    depth: 32,
  },
  {
    width: 1366,
    height: 768,
    depth: 32,
  },
  {
    width: 1400,
    height: 1050,
    depth: 32,
  },
  {
    width: 1440,
    height: 900,
    depth: 32,
  },
  {
    width: 1600,
    height: 900,
    depth: 32,
  },
  {
    width: 1680,
    height: 1050,
    depth: 32,
  },
  {
    width: 1920,
    height: 1080,
    depth: 32,
  },
];
/**
 * @type {Element}
 */
var _eventCanvas = document.querySelector("#blitz");
/**
 * @type {Element}
 */
var _mouseElement = undefined;

var _mouseXPosition = 0;
var _mouseYPosition = 0;
var _mouseHitTimes = [];
var _mouseDownThis = null;
// var _mouseDownCheck = null;
/**
 * @type {NodeJS.Timer}
 */
var _waitMouseInterval = undefined;
/**
 * @type {MouseEvent}
 */
var _waitMouseEvent = undefined;
_addListener("mousedown", _mouseDownGetMouseDown, "mousedown");
_addListener("mouseup", _mouseDownRemoveMouseDown, "mousedown");
_addListener("mousedown", _mouseHitGetCode, "mousehit");
_addListener("mousedown", _waitMouseGetCode, "waitmouse");

/**
 * @type {string | number | NodeJS.Timer}
 */
var _waitKeyInterval = undefined;
/**
 * @type {{ key: string | any[]; keyCode: any; location: number; }}
 */
var _waitKeyEvent = undefined;
_addListener("keydown", _keyDownGetKeyDown, "keydown");
_addListener("keyup", _keyDownRemoveKeyDown, "keydown");
_addListener("keydown", _waitKeyGetCode, "waitkey");

var _setFontCurrent = {
  family: "courier",
  size: 80 / 6,
  height: 80 / 6,
  bold: false,
  italic: false,
  underline: false,
};

var _currentDirCached = "";
var _readDirList = {};
/**
 * @type {string[]}
 */
var _dataList = [];

var _setGammaDestRed = 0;
var _setGammaDestGreen = 0;
var _setGammaDestBlue = 0;

var _seedRndNumber = 98764321;
/**
 * @type {() => number}
 */
var _seedRndFn = null;
_seedrnd(_seedRndNumber);

var _delayTimer = undefined;
/**
 * @type {number}
 */
var _asyncTimer = _millisecs();

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

window.onload = () => {
  if (_eventCanvas) {
    _mouseElement = document.querySelector("#blitzPointer");
    _eventCanvas.requestPointerLock = _eventCanvas.requestPointerLock || _eventCanvas.mozRequestPointerLock || _eventCanvas.webkitRequestPointerLock;
    document.pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    document.addEventListener("mousemove", (event) => {
      var rect = _eventCanvas.getBoundingClientRect();
      _mouseXSpeedOffset = event.movementX;
      _mouseYSpeedOffset = event.movementY;
      if (_pointerLocked) {
        _mouseXPosition += _mouseXSpeedOffset;
        _mouseYPosition += _mouseYSpeedOffset;
      } else {
        _mouseXPosition = (_eventCanvas.width / window.innerWidth) * event.x - _eventCanvas.offsetLeft;
        _mouseYPosition = (_eventCanvas.height / window.innerHeight) * event.y - _eventCanvas.offsetTop;
      }
      _mouseXPosition = _mouseXPosition < 0 ? 0 : _mouseXPosition > _eventCanvas.width ? _eventCanvas.width : _mouseXPosition;
      _mouseYPosition = _mouseYPosition < 0 ? 0 : _mouseYPosition > _eventCanvas.height ? _eventCanvas.height : _mouseYPosition;
      _mouseElement.setAttribute("style", `left: ${_mouseXPosition + rect.left}px; top: ${_mouseYPosition + rect.top}px;`);
    });
    document.addEventListener("wheel", (event) => {
      _mouseZSpeedOffset = -event.deltaY / 100;
      _mouseZPosition += _mouseZSpeedOffset;
    });

    _eventCanvas.oncontextmenu = function (/** @type {any} */ e) {
      return false;
    };

    // _eventCanvas.addEventListener('click', (event) => {
    // 	_lockPointer();
    // });
  }
};

window.addEventListener("error", (/** @type { ErrorEvent } */ event) => {
  console.log(event);
  _errorlog(`${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
});

var _pointerLocked = false;
// document.addEventListener('pointerlockchange', (event) => {
// 	if (document.pointerLockElement === _eventCanvas) {
// 		_mouseElement.classList.add('show');
// 		_pointerLocked = true;
// 	} else {
// 		_mouseElement.classList.remove('show');
// 		_pointerLocked = false;
// 	}
// });

async function _writestring(stream, string) {
	if (!stream.readonly) {
		const length = _int2string(string.length);
		string = length + string;
		const output = stream.data || '';
		const newString = output.substr(0, stream.position) + string + output.substr(stream.position + string.length);
		stream.data = newString;
		stream.position += string.length;
		if (stream && stream.name && stream.name.indexOf(':') > -1) { //TCP
			stream = _postCommand('writeline', stream);
		}
	}
	return await stream;
}
async function _writeshort(stream, short, offset) {
	const string = _int2string((short + _SHORT_MAX) % _SHORT_MAX, 2);
	return await _writeline(stream, string, offset);
}
function _writepixelfast(x, y, argb, buffer = _currentGraphicsBuffer) {
  if (buffer.context && buffer.locked) {
    const rgb = (0xffffffff + argb + 1)
      .toString(16)
      .toUpperCase()
      .substring(3)
      .match(/.{1,2}/g)
      .map((res) => parseInt(res, 16));
    var index = _dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
    buffer.image.data[index + 0] = rgb[0];
    buffer.image.data[index + 1] = rgb[1];
    buffer.image.data[index + 2] = rgb[2];
    buffer.image.data[index + 3] = 255;
  }
}

function _writepixel(x, y, argb, buffer = _currentGraphicsBuffer) {
  if (buffer.context) {
    const rgb = (0xffffffff + argb + 1)
      .toString(16)
      .toUpperCase()
      .substring(3)
      .match(/.{1,2}/g)
      .map((res) => parseInt(res, 16));
    buffer.context.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    buffer.context.fillRect(x + _originX, y + _originY, 1, 1);
    if (buffer.image) {
      _writepixelfast(x, y, argb, buffer);
    }
  }
}

async function _writeline(stream, string, position) {
	if (!stream.readonly) {
		position = typeof position === 'undefined' ? stream.position : position;
		const output = stream.data || '';
		const newString = output.substr(0, position) + string + output.substr(position + string.length);
		stream.data = newString;
		stream.position += string.length;
		if (stream && stream.name && stream.data && stream.name.indexOf(':') > -1 && (stream.data.endsWith('\n') || stream.data.endsWith('\\n'))) { //TCP
			stream = _postCommand('writeline', stream);
		}
	}
	return await stream;
}
async function _writeint(stream, integer, offset) {
	const string = _int2string(integer);
	return await _writeline(stream, string, offset);
}
async function _writefloat(stream, float, offset) {
  const farr = new Float32Array(1);
  farr[0] = float % _FLOAT_MAX;
  var barr = new Int8Array(farr.buffer);
  const string = _bytes2string(barr.toString().split(","), 4);
  return await _writeline(stream, string, offset);
}

async function _writefile(filename) {
	let path = _normalizeFile(filename);
	return await _postCommand('writefile', {
		name: path,
		data: ''
	});
}
async function _writebytes(bank, stream, offset, count) { // from bank to stream
	let string = bank.data.substring(offset, offset + count);
	string = string.substring(offset, offset + count);
	stream.data = string;
	return string.length;
}
async function _writebyte(stream, byte, offset) {
	return await _writeline(stream, String.fromCharCode((byte + _BYTE_MAX) % _BYTE_MAX), offset);
}
var _writeX = 0;
function _write(txt = 0 || "") {
  if (_currentGraphicsBuffer.context) {
    if (txt instanceof _Float) {
      txt = txt.float;
    } else if (typeof txt === "number") {
      txt = _roundFloat(txt);
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillText(txt, _printX + _writeX + _originX, _printY + _originY + offY);
    _writeX = _writeX + _currentGraphicsBuffer.context.measureText(txt).width;
  }
}

function _waittimer(timer) {
	while (_millisecs() - timer.millisecs < 1000 / timer.frequency) { }
	timer.millisecs = _millisecs();
}
function _waitmouse() {
  function done() {
    const mouseIndex = [0, 1, 3, 2];
    const result = mouseIndex[_waitMouseEvent.which || _waitMouseEvent.button + 1 || 0];
    _waitMouseEvent = undefined;
    return result;
  }
  return new Promise((resolve) => {
    _waitMouseInterval = setInterval(() => {
      if (_waitMouseEvent) {
        clearInterval(_waitMouseInterval);
        resolve(done());
        //_removeListener('mousedown', 'waitmouse');
      }
    });
  });
}

/**
 * @param {KeyboardEvent} event
 */
function _waitKeyGetCode(event) {
  _waitKeyEvent = event;
}

function _waitkey(char = false) {
  /**
   * @param {boolean} [key]
   */
  function done(key) {
    const result = key ? _waitKeyEvent.key : _waitKeyEvent.key.length === 1 ? _asc(_waitKeyEvent.key) : _waitKeyEvent.keyCode;
    _waitKeyEvent = undefined;
    return result;
  }
  return new Promise((resolve) => {
    _waitKeyInterval = setInterval(() => {
      if (_waitKeyEvent) {
        if (char) {
          if (_waitKeyEvent.location === 0) {
            clearInterval(_waitKeyInterval);
            resolve(done(true));
          } else {
            _waitKeyEvent = undefined;
          }
        } else {
          clearInterval(_waitKeyInterval);
          resolve(done());
        }
      }
    });
  });
}

function _viewport(x, y, width, height, buffer = _currentGraphicsBuffer) {
  if (buffer.context && !buffer.locked) {
    buffer.context.restore();
    buffer.context.save();
    let region = new Path2D();
    region.rect(x + _originX, y + _originY, width, height);
    buffer.context.clip(region);
  }
}

//TO BE DONE
function _vwait(frames = 1) { }
function _upper(string) {
	return string.toUpperCase();
}
//TO BE DONE
function _updategamma() {
  // @ts-ignore
  document.querySelector("#gamma").style.backgroundColor = `rgb(${_setGammaDestRed},${_setGammaDestGreen},${_setGammaDestBlue})`;
  // const imageData = _currentGraphicsBuffer.context.getImageData(0, 0, _currentGraphicsBuffer.canvas.width, _currentGraphicsBuffer.canvas.height);
  // const data = imageData.data;
  // for (var i = 0; i < data.length; i += 4) {
  // 	data[i] = _setGammaDestRed;
  // 	data[i + 1] = _setGammaDestGreen;
  // 	data[i + 2] = _setGammaDestBlue;
  // }
  // _currentGraphicsBuffer.context.putImageData(imageData, 0, 0);
}

function _unlockbuffer(buffer = _currentGraphicsBuffer) {
  buffer.locked = false;
  buffer.context.putImageData(buffer.image, 0, 0);
  delete buffer.image;
  buffer.image = undefined;
}

/**
 * @param {string} string
 */
function _trim(string) {
  return string.trim();
}

//TO BE DONE
function _totalvidmem() {
	return -65536;
}
/**
 * @param {GraphicsBuffer[]} image
 */
function _tileimage(image, x = 0, y = 0, frame = 0, buffer = _currentGraphicsBuffer) {
  frame = Math.floor(frame);
  if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
    const pattern = buffer.context.createPattern(image[frame].canvas, "repeat");
    buffer.context.translate(x + _originX - image[frame].x, y + _originY - image[frame].y);
    buffer.context.rect(-x, -y, buffer.canvas.width - _originX + image[frame].x, buffer.canvas.height - _originY + image[frame].y);
    buffer.context.fillStyle = pattern;
    buffer.context.fill();
    buffer.context.translate(-(x + _originX - image[frame].x), -(y + _originY - image[frame].y));
  }
}

function _tileblock(image, x = 0, y = 0, frame = 0, buffer = _currentGraphicsBuffer) {
  if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
    const pattern = buffer.context.createPattern(image[frame].canvas, "repeat");
    buffer.context.fillStyle = "rgb(0, 0, 0)";
    buffer.context.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    buffer.context.translate(x + _originX - image[frame].x, y + _originY - image[frame].y);
    buffer.context.rect(-x, -y, buffer.canvas.width - _originX + image[frame].x, buffer.canvas.height - _originY + image[frame].y);
    buffer.context.fillStyle = pattern;
    buffer.context.fill();
    buffer.context.translate(-(x + _originX - image[frame].x), -(y + _originY - image[frame].y));
  }
}

function _text(x = 0, y = 0, txt = "", centerX = false, centerY = false) {
  if (_currentGraphicsBuffer.context) {
    if (txt instanceof _Float) {
      txt = txt.float;
    } else if (typeof txt === "number") {
      txt = _roundFloat(txt);
    }
    if (centerX) {
      _currentGraphicsBuffer.context.textAlign = "center";
    }
    if (centerY) {
      _currentGraphicsBuffer.context.textBaseline = "middle";
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillText(txt, x + _originX, y + _originY + offY);
    _currentGraphicsBuffer.context.textAlign = "left";
    _currentGraphicsBuffer.context.textBaseline = "top";
  }
}

function _tan(degrees) {
	return Math.tan(degrees * (Math.PI / 180));
}
function _tformimage(image, a, b, c, d) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].transform11 = a;
			image[i].transform12 = b;
			image[i].transform21 = c;
			image[i].transform22 = d;
		}
	}
}
var _tFormFilterEnabled = true;

function _tformfilter(enable) {
	_tFormFilterEnabled = enable;
}
async function _tcptimeouts(read, accept) {
	return await _postCommand('tcptimeouts', { read: read, accept: accept });
}
function _tcpstreamport(stream) {
	return stream.name.replace(/^.*?:/, '');
}
function _tcpstreamip(stream) {
	return stream.name.replace(/:.*?$/, '');
}
async function _systemproperty(property) {
	return await _getCommand('systemproperty', property);
}
function _stringwidth(string) {
  if (_currentGraphicsBuffer.context) {
    return Math.round(_currentGraphicsBuffer.context.measureText(string).width);
  }
}

function _stringheight(string) {
	return _setFontCurrent.height;
}
/**
 * @param {string} string
 * @param {number} integer
 */
function _string(string, integer) {
  return Array(integer + 1).join(string);
}

function _str(val) {
  return _tostring(val);
}

function _stopchannel(channel) {
	channel.sound.stop(channel.id);
}
function _stop() {
  throw new Error("Program has stopped.");
}

function _sqr(float) {
	return Math.sqrt(float);
}
function _soundvolume(media, volume) {
	media.volume = 0 + volume;
}
function _soundpitch(media, pitch) {
	media.pitch = 0 + pitch / media.sound._sampleRate;
}
function _soundpan(media, pan) {
	media.pan = 0 + pan;
}
function _sin(degrees) {
	return Math.sin(degrees * (Math.PI / 180));
}
function _showpointer() {
  const pointer = document.querySelector("#blitzPointer");
  pointer.classList.remove("hidepointer");
  _eventCanvas.classList.remove("hidepointer");
}

function _sgn(number) {
	return Math.sign(number);
}
//TO BE DONE
function _setgamma(r, g, b, r2, g2, b2) {
  _setGammaDestRed = r2 - r;
  _setGammaDestGreen = g2 - g;
  _setGammaDestBlue = b2 - b;
}

// N/A
function _setgfxdriver() {}

/**
 * @param {{ family: string; size: number; height?: number; bold: boolean; italic: boolean; underline: boolean; }} font
 */
function _setfont(font, buffer = _currentGraphicsBuffer) {
  if (buffer.context) {
    _setFontCurrent = font;
    const weightS = font.bold ? "bold " : "";
    const italicS = font.italic ? "italic " : "";
    const underlinedS = font.underline ? "underline " : "";
    buffer.context.font = `${italicS}${weightS}${font.size}px "${font.family}"`;
  }
}

async function _setenv(variable, value) {
	return await _postCommand('setenv', { variable: variable, value: value });
}
function _setbuffer(buffer = _currentGraphicsBuffer) {
  _currentGraphicsBuffer = buffer;
}

function _seekfile(handle, position) {
	handle.position = position;
}
/**
 * @param {number} num
 */
function _seedrnd(num) {
  _seedRndNumber = num;
  _rndseed();
}

/**
 * @param {string} str
 */
function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 */
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

//TO BE DONE
function _scanline() {
	return 0;
}
function _scaleimage(image, scalex, scaley) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].scaleX = scalex;
			image[i].scaleY = scaley;
		}
	}
}
async function _saveimage(image, filename, frame = 0) {
	return await _savebuffer(image[frame], filename);
}
async function _savebuffer(buffer, filename) {
	if (buffer.context) {
		return await _postCommand('savebuffer', {
			filename: filename,
			data: buffer.canvas.toDataURL('image/png')
		});
	} else {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

function _runtimeerror(text, color = "#f57") {
  _debuglog(text, color);
  throw new Error();
}

function _rotateimage(image, value) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].rotate = value * Math.PI / 180;
		}
	}
}
function _rndseed() {
  var seed = cyrb128(`${_seedRndNumber}`);
  _seedRndFn = sfc32(seed[0], seed[1], seed[2], seed[3]);
  return _seedRndNumber;
}

/**
 * @param {number} start
 * @param {number} end
 */
function _rnd(start = 0.0, end = 1.0) {
  // if (start instanceof _Float) {
  //   start = start.value;
  // }
  // if (end instanceof _Float) {
  //   end = end.value;
  // } else {
  //   // end = end + 1;
  // }
  if (start >= end) {
    end = start;
    start = 0.0;
  }
  const result = _seedRndFn() * (end - start) + start;
  // if (start instanceof _Float && end instanceof _Float) {
  //   return new _Float(result);
  // }
  return result;
}

function _right(string, length) {
	return (string || '').slice(-length);
}
function _resumechannel(channel) {
	channel.sound.play(channel.id);
}
function _restore(label) {
	_readIndex = _dataList.indexOf(`__${label}`) + 1;
}
function _resizeimage(image, width, height) {
	if (image) {
		for (let i = 0, _length = image.length; i < _length; i++) {
			image[i].scaleX = width / image[i].canvas.width;
			image[i].scaleY = height / image[i].canvas.height;
		}
	}
}
function _resizebank(bank, size = 0) {
	bank.data = bank.data.substring(0, bank.data.length) + Array(bank.data.length + 1).join(_chr(0));
	return bank;
}
function _replace(string, find, replace) {
	return string.split(find).join(replace);
}
function _rect(x, y, w, h, solid = true) {
  if (_currentGraphicsBuffer.context && w > 0 && h > 0) {
    if (solid) {
      _currentGraphicsBuffer.context.fillStyle = _colorRGB();
      _currentGraphicsBuffer.context.fillRect(x + _originX, y + _originY, w, h);
    } else {
      _currentGraphicsBuffer.context.translate(0.5, 0.5);
      _currentGraphicsBuffer.context.strokeStyle = _colorRGB();
      _currentGraphicsBuffer.context.beginPath();
      _currentGraphicsBuffer.context.rect(x + _originX, y + _originY, w - 1, h - 1);
      _currentGraphicsBuffer.context.stroke();
      _currentGraphicsBuffer.context.translate(-0.5, -0.5);
    }
  }
}

function _readstring(stream) {
  var length = _string2int(stream.data.substring(stream.position, stream.position + 4));
  const output = stream.data.substring(stream.position + 4, stream.position + 4 + length);
  stream.position += length + 4;
  return output;
}

function _readshort(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 2);
	let number = _string2int(string);
	stream.position += string.length;
	return number;
}
function _readpixelfast(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context && buffer.locked) {
    var data = buffer.image.data;
    var index = _dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
    return (data[index + 0] || 0) * 65536 + (data[index + 1] || 0) * 256 + (data[index + 2] || 0) * 1;
  }
}

function _readpixel(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    return (data[0] || 0) * 65536 + (data[1] || 0) * 256 + (data[2] || 0) * 1;
  }
}

function _readline(stream) {
	var nextBreak = stream.data.indexOf('\n', stream.position + 1);
	nextBreak = nextBreak > -1 ? nextBreak : stream.data.length;
	const output = stream.data.substring(stream.position, nextBreak);
	stream.position += output.length + 1;
	return output.substring(0, output.length - 1);
}
function _readint(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 4);
	let number = _string2int(string);
	// if (number >= _INTEGER_MAX) {
	// 	number = number - _INTEGER_MAX * 2;
	// }
	stream.position += string.length;
	return number ^ 0x100000000;
}
function _readfloat(stream, position) {
	position = typeof position === 'undefined' ? stream.position : position;
	const string = stream.data.slice(position, position + 4);
	const bytes = _string2bytes(string, 4);

	const buf = new ArrayBuffer(4);
	const view = new DataView(buf);
	bytes.forEach(function (b, i) {
		view.setInt8(3 - i, b);
	});
	const float = new _Float(view.getFloat32(0));
	stream.position += string.length;
	return float;
}
async function _readfile(filename) {
  let path = _normalizeFile(filename);
  return {
    name: path,
    data: await _getCommand("openfile", path),
    position: 0,
    readonly: true,
  };
}

/**
 * @param {string} directory
 */
async function _readdir(directory = "") {
  let path = _normalizeFile(directory);
  const dir = await _postCommand("readdir", { folder: path });
  if (dir !== "0") {
    _readDirList[dir.folder] = dir;
    return _readDirList[dir.folder];
  }
  return 0;
}

function _readbytes(bank, stream, offset, count) { // from stream to bank
	let string = stream.data.substring(stream.position, stream.position + count);
	string = string.substring(offset, offset + bank.data.length);
	bank.data = string;
	return string.length;
}
function _readbyte(stream, position) {
  position = typeof position === "undefined" ? stream.position : position;
  if (typeof stream === "string") {
    console.log(stream);
  }
  const string = stream.data.substring(position, position + 1);
  stream.position += string.length;
  return string.charCodeAt(0); // + _BYTE_MAX) % _BYTE_MAX;
}

function _readavail(stream) {
	return stream.data.length - stream.position < 0 ? 0 : stream.data.length - stream.position;
}
var _readIndex = 0;
function _read() {
  let result;
  do {
    result = _dataList[_readIndex++];
  } while (typeof result === "string" && result.indexOf("__") === 0);
  return result;
}

function _rand(start = 1, end = 0) {
  if (start >= end) {
    end = start;
    start = 0;
  }
  return Math.floor(_rnd(start, end + 1));
}

function _rset(string, length) {
	if (typeof string === 'number') {
		string = _roundFloat(string);
	}
	return String(string).padStart(length);
}
function _print1(/** @type {_Float | boolean | number | string} */ txt = "", /** @type {boolean} */ fix = false, buffer = _frontbuffer()) {
  if (buffer.context) {
    // if (txt instanceof _Float) {
    //   txt = txt.float;
    // } else if (typeof txt === "number") {
    //   if (txt.toString().indexOf(".") > -1) {
    //     txt = _roundFloat(txt);
    //   }
    // }
    if (!fix && _printY + _setFontCurrent.height * 0.5 > buffer.canvas.height) {
      _saveScreen(buffer);
      _loadScreen(0, -_setFontCurrent.height, buffer);
      _printY = _printY - _setFontCurrent.height;
    }
    const offY = _setFontCurrent.height - _setFontCurrent.size;
    buffer.context.fillStyle = _colorRGB();
    buffer.context.fillText(`${txt}`, _printX + _writeX + _originX, _printY + _originY + offY);
    if (!fix) {
      _printY = _printY + _setFontCurrent.height;
      _printX = 0;
    }
    _writeX = 0;
  }
}
function _print(/** @type {any[]} */ ...txt) {
  const txtjoin = txt.join("");
  _print1(txtjoin, true, _backbuffer());
  _print1(txtjoin);
}

function _pokeshort(bank, offset, short) {
	return _writeshort(bank, short, offset);
}
function _pokeint(bank, offset, int) {
	return _writeint(bank, int, offset);
}
function _pokefloat(bank, offset, float) {
	return _writefloat(bank, float, offset);
}
function _pokebyte(bank, offset, byte) {
	return _writebyte(bank, byte, offset);
}
function _plot(x, y) {
  if (_currentGraphicsBuffer.context && !_currentGraphicsBuffer.locked) {
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillRect(x + _originX, y + _originY, 1, 1);
  }
}

async function _playsound(media) {
	try {
		const id = media.sound.play();
		media.sound.rate(media.pitch, id);
		media.sound.volume(media.volume, id);
		media.sound.stereo(media.pan, id);
		media.sound.loop(media.loop, id);
		const channel = {
			id: id,
			sound: media.sound
		};
		while (await _async() && !_channelplaying(channel)) { }
		return channel;
	} catch (err) {
		console.warn('Failed to play sound', media.filename, '-', err.message);
	}
	return null;
}

async function _playmusic(filename) {
	const media = await _loadsound(filename);
	return _playsound(media);
}
function _pi() {
	return Math.PI;
}

function _peekshort(bank, offset) {
	return _readshort(bank, offset);
}
function _peekint(bank, offset) {
	return _readint(bank, offset);
}
function _peekfloat(bank, offset) {
	return _readfloat(bank, offset);
}
function _peekbyte(bank, offset) {
	return _readbyte(bank, offset);
}
function _pausechannel(channel) {
	channel.sound.pause(channel.id);
}
function _oval(x, y, w, h, solid = true) {
  if (_bufferEditable() && w > 0 && h > 0) {
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.strokeStyle = _colorRGB();
    _currentGraphicsBuffer.context.beginPath();
    _currentGraphicsBuffer.context.ellipse(x + w / 2 + _originX, y + h / 2 + _originY, w / 2, h / 2, 0, 0, 2 * Math.PI);
    if (solid) {
      _currentGraphicsBuffer.context.fill();
    } else {
      _currentGraphicsBuffer.context.stroke();
    }
  }
}

var _originX = 0;
var _originY = 0;
function _origin(x, y) {
	_originX = x;
	_originY = y;
}
async function _opentcpstream(ip, port) {
	return await _postCommand('opentcpstream', { ip: ip, port: port });
}
/**
 * @type {NodeJS.Timer}
 */
var _openMovieInterval = undefined;
var _openMoviePlaying = false;

/**
 * @param {string} filename
 */
async function _openmovie(filename) {
  const movie = document.createElement("video");
  movie.src = filename;
  movie.autoplay = true;
  movie.muted = true;
  movie.controls = false;
  movie.loop = true;
  movie.addEventListener("canplaythrough", play, false);
  _openMovieInterval = undefined;
  _openMoviePlaying = false;

  function play() {
    movie.play();
    _openMoviePlaying = true;
  }
  return new Promise((resolve) => {
    _openMovieInterval = setInterval(() => {
      if (_openMoviePlaying) {
        clearInterval(_openMovieInterval);
        resolve({
          name: filename.trim(),
          data: movie,
        });
      }
    }, 100);
  });
}

async function _openfile(filename) {
	let path = _normalizeFile(filename);
	const result = await _getCommand('openfile', path);
	return {
		name: path,
		data: result,
		position: 0,
		readonly: false
	}
}
function _not(cond) {
	return !cond.valueOf();
}
function _nextfile(directory) {
	return directory && directory.file && directory.file[directory.position] && directory.file[directory.position].name ?
		directory.file[directory.position++].name :
		'';
}
function _new(klass) {
  const self = klass;
  //   klass._index += 1;
  klass._sub.push({
    ...klass._obj,
    get _sub() {
      return self._sub;
    },
    get _type() {
      return self;
    },
    get _index() {
      return klass._sub.indexOf(this);
    },
  });
  return klass._sub[klass._sub.length - 1];
}

function _moviewidth(movie) {
	return movie.data.videoWidth;
}
function _movieplaying(movie) {
	return movie.data.paused || movie.data.ended ? 0 : 1;
}
function _movieheight(movie) {
	return movie.data.videoHeight;
}
/**
 * @param {number} x
 * @param {number} y
 */
function _movemouse(x, y) {
  _mouseXPosition = x;
  _mouseYPosition = y;
  document.dispatchEvent(new MouseEvent("mousemove"));
}

var _mouseZSpeedOffset = 0;
function _mousezspeed() {
	const result = _mouseZSpeedOffset;
	_mouseZSpeedOffset = 0;
	return result;
}
var _mouseZPosition = 0;
function _mousez() {
	return _mouseZPosition;
}
var _mouseYSpeedOffset = 0;
function _mouseyspeed() {
	return _mouseYSpeedOffset;
}
function _mousey() {
  return _mouseYPosition;
}

var _mouseXSpeedOffset = 0;
function _mousexspeed() {
	return _mouseXSpeedOffset;
}
function _mousex() {
  return _mouseXPosition;
}

/**
 * @param {MouseEvent} event
 */
function _waitMouseGetCode(event) {
  _waitMouseEvent = event;
}

function _mousewait() {
  function done() {
    const mouseIndex = [0, 1, 3, 2];
    const result = mouseIndex[_waitMouseEvent.which || _waitMouseEvent.button + 1 || 0];
    _waitMouseEvent = undefined;
    return result;
  }
  return new Promise((resolve) => {
    _waitMouseInterval = setInterval(() => {
      if (_waitMouseEvent) {
        clearInterval(_waitMouseInterval);
        resolve(done());
        //_removeListener('mousedown', 'waitmouse');
      }
    });
  });
}

function _mouseHitGetCode(event) {
  const mouseIndex = [0, 1, 3, 2];
  const result = mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
  _mouseHitTimes[result] = (_mouseHitTimes[result] || 0) + 1;
}

function _mousehit(button) {
  const res = _mouseHitTimes[button];
  if (res > 0) {
    _mouseHitTimes[button] = 0;
    return res || 0;
  } else {
    return 0;
  }
}

function _mouseDownGetMouseDown(event) {
  //event.preventDefault();
  _mouseDownThis = event;
}
function _mouseDownRemoveMouseDown() {
  _mouseDownThis = null;
}

function _mousedown(button) {
  if (_mouseDownThis) {
    const mouseIndex = [0, 1, 3, 2];
    const res = button === mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
    // _mouseDownCheck = null;
    return res ? 1 : 0;
  }
  return 0;
}

function _millisecs() {
  var date = new Date();
  return date.getTime();
}

function _midhandle(image) {
	for (let i = 0, _length = image.length; i < _length; i++) {
		image[i].x = image[i].canvas.width / 2;
		image[i].y = image[i].canvas.height / 2;
	}
}
function _mid(string, offset, characters) {
	const len = isNaN(offset - 1 + characters) ? undefined : offset - 1 + characters;
	return (string || '').substring(offset - 1, len);
}
function _maskimage(image, red, green, blue) {
  for (let i = 0, _length = image.length; i < _length; i++) {
    const imageData = image[i].context.getImageData(0, 0, image[i].canvas.width, image[i].canvas.height);
    const data = imageData.data;
    for (let i = 0, _length = data.length; i < _length; i += 4) {
      if (data[i] === red && data[i + 1] === green && data[i + 2] === blue) {
        data[i + 3] = 0;
      } else {
        data[i + 3] = 255;
      }
    }
    image[i].context.putImageData(imageData, 0, 0);
  }
}

function _lower(string) {
	return string.toLowerCase();
}
function _loopsound(media) {
	media.loop = true;
}
function _log10(x) {
	return Math.log10(x);
}
function _log(x) {
	return Math.log(x);
}
function _lockbuffer(buffer = _currentGraphicsBuffer) {
  buffer.locked = true;
  buffer.image = buffer.context.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
}

var _printX = 0;
var _printY = 0;
function _locate(x, y) {
	_printX = x + _originX;
	_printY = y + _originY;
}

async function _loadsound(filename) {
	return new Promise((resolve, reject) => {
		const sound = new Howl({
			src: [filename],
			onload: () => {
				resolve({
					filename: filename,
					sound: sound,
					volume: 1.0,
					pitch: 1.0,
					pan: 0.0,
					loop: false
				});
			},
			onloaderror: () => {
				console.log('load error')
				resolve({
					filename: filename,
					sound: sound,
					volume: 1.0,
					pitch: 1.0,
					pan: 0.0,
					loop: false
				});
			}
		});
		// sound.once('load', () => {
		// 	resolve({
		// 		filename: filename,
		// 		sound: sound,
		// 		volume: 1.0,
		// 		pitch: 1.0,
		// 		pan: 0.0,
		// 		loop: false
		// 	});
		// });
	});
}
/**
 * @param {string} filename
 */
async function _loadimage(filename) {
  /**
   * @type {{ canvas: Element; id: any; locked: boolean; x: number; y: number; scaleX: number; scaleY: number; rotate: number; transform11: number; transform21: number; transform12: number; transform22: number; context: any; }[]}
   */
  const image = [];
  var img = new Image();
  img.src = filename;
  filename = filename.replace(/\\/g, "/");
  const id = `loadimage_${filename}`;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const buffer = _graphicsCreate(img.width, img.height, id);
      buffer.context.drawImage(img, 0, 0);
      image.push(buffer);
      _maskimage(image, 0, 0, 0);
      resolve(image);
    };
    img.onerror = () => {
      console.warn(`LoadImage: Image "${filename}" not found.`);
      resolve();
    };
  });
}

async function _loadfont(family, size, bold, italic, underline, name = family) {
  const result = {
    family: name,
    size: size - 4,
    height: size,
    bold: bold,
    italic: italic,
    underline: underline,
  };
  if (family.indexOf(".") > 0) {
    const fonts = document.querySelector("#blitzFonts");
    if (fonts.innerHTML.indexOf(`url('${family}')`) === -1) {
      const extList = {
        eot: "embedded-opentype",
        svg: "svg",
        ttf: "truetype",
        woff: "woff",
        woff2: "woff2",
        fon: "fon",
      };
      const ext = family.replace(/^(.*)\.(.*?)$/, "$2");
      const boldS = bold ? "bold" : "normal";
      const italicS = italic ? "italic" : "normal";
      fonts.innerHTML += `@font-face {
	font-family: '${name}';
	src: local('${name}'),
		url('${family}') format('${extList[ext]}');
	font-weight: ${boldS};
	font-style: ${italicS};
}
`;
      document.fonts.ready.then(() => {
        if (_currentGraphicsBuffer.context) {
          _currentGraphicsBuffer.context.font = `10px "${name}"`;
          _currentGraphicsBuffer.context.fillText("", 0, 0);
        }
      });
      return new Promise((resolve, reject) => {
        document.fonts.onloadingdone = function (fontFaceSetEvent) {
          _setfont(_setFontCurrent);
          resolve(result);
        };
      });
    }
  }
  return result;
}

function _loadfontsync(family, size, bold, italic, underline) {
  return {
    family: family,
    size: size - 4,
    height: size,
    bold: bold,
    italic: italic,
    underline: underline,
  };
}

async function _loadbuffer(buffer, filename) {
	return new Promise((resolve, reject) => {
		if (_bufferEditable()) {
			var img1 = new Image();
			img1.src = filename;
			img1.onload = () => {
				resolve(buffer.context.drawImage(img1, 0, 0, buffer.canvas.width, buffer.canvas.height));
			};
			img1.onerror = () => {
				resolve();
			}
		} else {
			resolve();
		}
	});
}
async function _loadanimimage(filename, width, height, first, count) {
	const imageSrc = await _loadimage(filename);
	const bufferSrc = imageSrc[0];
	const imageTar = _createimage(width, height, count - first);
	var c = 0;
	var x = 0;
	var y = 0;
	while (c < count) {
		if (x * width >= bufferSrc.canvas.width) {
			x = 0;
			y++;
		}
		if (c >= first) {
			_drawblockrect([bufferSrc], 0, 0, x * width, y * height, width, height, 0, false, imageTar[c - first]);
		}
		x++;
		c++;
	}
	return imageTar;
}
function _line(x1, y1, x2, y2) {
  if (_bufferEditable()) {
    _currentGraphicsBuffer.context.strokeStyle = _colorRGB();
    _currentGraphicsBuffer.context.translate(0.5, 0.5);
    _currentGraphicsBuffer.context.beginPath();
    _currentGraphicsBuffer.context.moveTo(x1 + _originX, y1 + _originY);
    _currentGraphicsBuffer.context.lineTo(x2 + _originX, y2 + _originY);
    _currentGraphicsBuffer.context.stroke();
    _currentGraphicsBuffer.context.translate(-0.5, -0.5);
  }
}

function _len(string) {
	return string.length;
}
function _left(string, length) {
	return (string || '').substring(0, length);
}
const _last = (/** @type {any} */ obj) => {
  obj._type._index = obj._sub.length - 1;
  return obj._sub[obj._type._index];
};

function _lset(string, length) {
	if (typeof string === 'number') {
		string = _roundFloat(string);
	}
	return String(string).padEnd(length);
}
var _keyHitTimes = [];
function _keyHitGetCode(event) {
  const result = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  _keyHitTimes[result] = (_keyHitTimes[result] || 0) + 1;
}
_addListener("keydown", _keyHitGetCode, "keyhit");

function _keyhit(code) {
  const res = _keyHitTimes[code];
  if (res > 0) {
    _keyHitTimes[code] = 0;
    return res || 0;
  } else {
    return 0;
  }
}

var _keyDownList = {};
function _keyDownGetKeyDown(event) {
  //event.preventDefault();
  const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  _keyDownList[key] = 1;
}
function _keyDownRemoveKeyDown(event) {
  //event.preventDefault();
  const key = _scancode.indexOf(event.code) === -1 ? 0 : _scancode.indexOf(event.code);
  delete _keyDownList[key];
}

function _keydown(code) {
  return _keyDownList[code] || 0;
}

function _int(str) {
  var result = typeof str === "string" ? parseInt(str, 10) : Math.floor(str);
  return isNaN(result) ? 0 : result;
}

function _instr(string1, string2, offset = 1) {
	return string1.indexOf(string2, offset - 1) + 1;
}
const _insert = (/** @type {any} */ obj, /** @type {any} */ at) => {
  const objIndex = obj._index;
  const atIndex = at._index;
  obj._sub.splice(objIndex, 1);
  obj._sub.splice(atIndex, 0, obj);
  return 0;
};

var _inputText = "";
var _inputTextCursorInterval = undefined;
var _inputTextCursorTimeout = undefined;
async function _input(input) {
  _inputText = "";
  _saveScreen();
  _print1(`${input}`, true);
  function blink() {
    _rect(
      _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width + 1,
      _printY,
      _setFontCurrent.height * 0.5,
      _setFontCurrent.height,
      true
    );
    _inputTextCursorTimeout = setTimeout(() => {
      const col = [_getColorRed, _getColorGreen, _getColorBlue];
      _color(0, 0, 0);
      _rect(
        _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width,
        _printY - 1,
        _setFontCurrent.height * 0.5 + 2,
        _setFontCurrent.height + 2,
        true
      );
      _color(col[0], col[1], col[2]);
    }, 300);
  }
  blink();
  clearInterval(_inputTextCursorInterval);
  _inputTextCursorInterval = setInterval(() => {
    blink();
  }, 600);
  while (true) {
    const key = await _waitkey(true);
    if (key === "Backspace" || key === "Delete") {
      _inputText = _inputText.slice(0, _inputText.length - 1);
    } else if (key === "Enter") {
      return new Promise((resolve, reject) => {
        clearInterval(_inputTextCursorInterval);
        clearInterval(_inputTextCursorTimeout);
        _loadScreen();
        _print1(`${input}${_inputText}`, true);
        resolve(Number(_inputText) || _inputText);
        _printY = _printY + _setFontCurrent.height;
      });
    } else if (key.length === 1) {
      _inputText = _inputText + key;
    }
    _loadScreen();
    _rect(
      _printX + _currentGraphicsBuffer.context.measureText(input + _inputText).width + 1,
      _printY,
      _setFontCurrent.height * 0.5,
      _setFontCurrent.height,
      true
    );
    _print1(`${input}${_inputText}`, true);
  }
}

function _imagesoverlap(image, x, y, image2, x2, y2, frame = 0, frame2 = 0) {
	if (image && image[frame] && image2 && image2[frame2]) {
		return x - image[frame].canvas.width / 2 < x2 + image2[frame2].canvas.width / 2 &&
			x + image[frame].canvas.width / 2 >= x2 - image2[frame2].canvas.width / 2 &&
			y - image[frame].canvas.height / 2 < y2 + image2[frame2].canvas.height / 2 &&
			y + image[frame].canvas.height / 2 >= y2 - image2[frame2].canvas.height / 2 ? 1 : 0;
	}
	return 0;
}
function _imagescollide(image, x, y, frame, image2, x2, y2, frame2) {
  if (image && image[frame] && image2 && image2[frame2]) {
    if (_imagesoverlap(image, x, y, image2, x2, y2, frame, frame2)) {
      const intersect = _imagescollideIntersection(
        x,
        y,
        image[frame].canvas.width,
        image[frame].canvas.height,
        x2,
        y2,
        image2[frame2].canvas.width,
        image2[frame2].canvas.height
      );
      if (intersect.width > 0 && intersect.height > 0) {
        const imgData1 = image[frame].context.getImageData(intersect.x - x, intersect.y - y, intersect.width, intersect.height);
        const imgData2 = image2[frame2].context.getImageData(intersect.x - x2, intersect.y - y2, intersect.width, intersect.height);
        var imgData1Data = [...imgData1.data];
        var imgData2Data = [...imgData2.data];
        for (var i = 3, _length = imgData1Data.length; i < _length; i += 4) {
          if (imgData1Data[i] > 0 && imgData2Data[i] > 0) {
            return 1;
          }
        }
      }
    }
  }
  return 0;
}

function _imagescollideIntersection(x, y, width, height, x2, y2, width2, height2) {
  var rect1Right = x + width,
    rect1Bottom = y + height,
    rect2Right = x2 + width2,
    rect2Bottom = y2 + height2;

  var rect3Left = Math.max(x, x2),
    rect3Top = Math.max(y, y2),
    rect3Right = Math.min(rect1Right, rect2Right),
    rect3Bottom = Math.min(rect1Bottom, rect2Bottom);

  return {
    x: rect3Left,
    y: rect3Top,
    width: Math.ceil(rect3Right - rect3Left),
    height: Math.ceil(rect3Bottom - rect3Top),
  };
}

function _imageyhandle(image) {
	if (image && image[0]) {
		return image[0].y;
	}
	return 0;
}
function _imagexhandle(image) {
	if (image && image[0]) {
		return image[0].x;
	}
	return 0;
}
function _imagewidth(image) {
	if (image && image[0]) {
		return image[0].canvas.width;
	}
	return 0;
}
function _imageheight(image) {
	if (image && image[0]) {
		return image[0].canvas.height;
	}
	return 0;
}
function _imagebuffer(image, frame = 0) {
	if (image && image[frame]) {
		return image[frame];
	}
	return null;
}
async function _hostip(index) {
	return Number(await _getCommand('hostip', index));
}
function _hidepointer() {
  const pointer = document.querySelector("#blitzPointer");
  pointer.classList.add("hidepointer");
  _eventCanvas.classList.add("hidepointer");
}

function _hex(integer, length = 8) {
	const signAdd = integer < 0 ? 4294967296 : 0;
	return (Array(length + 1).join('0') + Number(integer + signAdd).toString(16)).slice(-length).toUpperCase();
}
function _handleimage(image, x, y) {
	for (let i = 0, _length = image.length; i < _length; i++) {
		image[i].x = x;
		image[i].y = y;
	}
}
function _graphicswidth() {
	return _eventCanvas.width;
}
function _graphicsheight() {
	return _eventCanvas.height;
}
function _graphicsdepth() {
	return _graphicsDepth;
}
function _graphicsbuffer() {
  return _currentGraphicsBuffer;
}

/**
 * @param {number} width
 * @param {number} height
 */
function _graphics(width, height, depth = 32, mode = 0) {
  for (let /** @type {"_front" | "_back"} */ id of ["_front", "_back"]) {
    _clscolor(0, 0, 0);
    _color(255, 255, 255);
    // _currentGraphicsBuffer = _graphicsCreate(width, height, id, mode);
    _graphicsBufferList[id] = _graphicsCreate(width, height, id, mode);
  }
  const front = _frontbuffer();
  // _currentGraphicsBuffer.id = "_front";
  _currentGraphicsBuffer = _graphicsBufferList._front;
  _graphicsDepth = depth;
  _graphicsMode = mode;
  _graphicsMidHandle = false;
  _eventCanvas = front.canvas;
  _setbuffer(front);
  _locate(0, 0);
  _printX = 0;
  _printY = 0;
  _writeX = 0;
  _mouseXPosition = width / 2;
  _mouseYPosition = height / 2;
}

/**
 * @param {number} width
 * @param {number} height
 * @param {string} id
 */
function _graphicsCreate(width, height, id, mode = -1) {
  let /** @type {GraphicsBuffer} */ buffer = _graphicsBufferList[id];
  if (!buffer?.canvas) {
    buffer = {
      canvas: undefined,
      context: undefined,
      id: "",
      locked: false,
      rotate: 0,
      scaleX: 0,
      scaleY: 0,
      transform11: 0,
      transform12: 0,
      transform21: 0,
      transform22: 0,
      x: 0,
      y: 0,
      mode: -1,
    };
    if (id === "_front") {
      buffer.canvas = document.querySelector("#blitz");
    } else if (id === "_back") {
      buffer.canvas = document.querySelector("#blitzBack");
    } else {
      buffer.canvas = document.createElement("canvas");
    }
    buffer.context = buffer.canvas.getContext("2d", { willReadFrequently: true });
    buffer.id = id;
  }
  buffer.locked = false;
  buffer.canvas.width = width;
  buffer.canvas.height = height;
  buffer.x = _graphicsMidHandle ? Math.floor(width / 2) : 0;
  buffer.y = _graphicsMidHandle ? Math.floor(height / 2) : 0;
  buffer.scaleX = 1.0;
  buffer.scaleY = 1.0;
  buffer.rotate = 0;
  buffer.transform11 = 1.0;
  buffer.transform21 = 0.0;
  buffer.transform12 = 0.0;
  buffer.transform22 = 1.0;
  // if (id === "_front") {
  buffer.context.restore();
  buffer.context.save();
  if (id === "_front") {
    if (mode === 1) document.body.classList.add("full");
    else document.body.classList.remove("full");
  }
  //   const w = window.innerWidth;
  //   const h = window.innerHeight;
  //   buffer.canvas.width = w;
  //   buffer.canvas.height = h;
  //   buffer.context.scale(w / width, h / height);
  // } else if (mode === 0 || mode === 2 || mode === 3) {
  buffer.canvas.width = width;
  buffer.canvas.height = height;
  // buffer.canvas.classList.remove("full");
  // }
  // }
  // buffer.context.filter =
  //   "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImZpbHRlciIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jUiB0eXBlPSJpZGVudGl0eSIvPjxmZUZ1bmNHIHR5cGU9ImlkZW50aXR5Ii8+PGZlRnVuY0IgdHlwZT0iaWRlbnRpdHkiLz48ZmVGdW5jQSB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48L2ZpbHRlcj48L3N2Zz4=#filter)"; // SLOOOOOW
  buffer.context.textBaseline = "top";
  buffer.context.textAlign = "left";
  buffer.context.lineWidth = 1;
  buffer.context.clearRect(0, 0, width, height);
  // buffer.context.translate(0.5, 0.5);
  _setfont(_setFontCurrent, buffer);
  return buffer;
}

function _grabimage(image, x, y, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect([buffer], 0, 0, x, y, image[frame].canvas.width, image[frame].canvas.height, frame, false, image[frame]);
}

var _getMouseEvent = undefined;
function _getmouse() {
	function getCode(event) {
		_getMouseEvent = event;
	}
	_addListener('mousedown', getCode, 'getmouse');
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if (_getMouseEvent) {
	// 			const mouseIndex = [0, 1, 3, 2];
	// 			resolve(mouseIndex[_getMouseEvent.which || _getMouseEvent.button + 1 || 0]);
	// 			_getMouseEvent = undefined;
	// 		} else {
	// 			resolve(0);
	// 		}
	// 	});
	// });
	const res = _getMouseEvent;
	if (res) {
		const mouseIndex = [0, 1, 3, 2];
		_getMouseEvent = undefined;
		return mouseIndex[res.which || res.button + 1 || 0];
	} else {
		return 0;
	}
}

var _getKeyEvent = undefined;
function _getkey() {
	function getCode(event) {
		_getKeyEvent = event;
	}
	_addListener('keydown', getCode, 'getkey');
	const res = _getKeyEvent;
	if (res && res.location === 0) {
		_getKeyEvent = undefined;
		return (res.key.length === 1 && _asc(res.key)) || res.which || res.keyCode || 0;
	} else {
		return 0;
	}
}

async function _getenv(variable) {
	return await _getCommand('getenv', variable);
}
var _getColorRed = 0;
var _getColorGreen = 0;
var _getColorBlue = 0;

function _getcolor(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context && !buffer.locked) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    _getColorRed = data[0];
    _getColorGreen = data[1];
    _getColorBlue = data[2];
  }
}

//TO BE DONE
function _gammared(r) {
	return 0;
}
//TO BE DONE
function _gammagreen(g) {
	return 0;
}
//TO BE DONE
function _gammablue(b) {
	return 0;
}
function _gfxmodewidth(mode) {
	return _graphicsModeList[mode].width;
}
function _gfxmodeheight(mode) {
	return _graphicsModeList[mode].height;
}
function _gfxmodeexists(width, height, depth) {
  return true; //_graphicsModeList.find(result => result.width === width && result.height === height && result.depth === depth) ? 1 : 0;
}

function _gfxmodedepth(mode) {
	return _graphicsModeList[mode].depth;
}
function _gfxdrivername() {
  const gl = document.createElement("canvas").getContext("webgl");
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}

function _frontbuffer() {
  return _graphicsBufferList["_front"];
}

function _freetimer(timer) {
	delete timer;
	timer = undefined;
	return timer;
}
function _freesound(media) {
	if (media && media.unload) {
		media.unload();
	}
	return undefined;
}
function _freeimage(image) {
	delete image;
	image = undefined;
	return image;
}
function _freefont(font) {
	if (_setFontCurrent === font) {
		_setFontCurrent = {
			family: 'arial',
			size: 16,
			bold: false,
			italic: false,
			underline: false
		};
	}
}

function _freebank(bank) {
	delete bank;
	bank = undefined;
	return bank;
}
function _fontwidth() {
  if (_currentGraphicsBuffer.context) {
    return Math.round(_currentGraphicsBuffer.context.measureText("W").width);
  }
}

function _fontheight() {
	return _setFontCurrent.height;
}
function _flushmouse() {
  clearInterval(_waitMouseInterval);
  _waitMouseInterval = undefined;
  _waitMouseEvent = undefined;
  _mouseHitTimes = [];
  _mouseDownThis = null;
  // _mouseDownCheck = null;
}

function _flushkeys() {
	_waitKeyEvent = undefined;
	_keyHitTimes = [];
}
function _floor(num) {
	return Math.floor(num);
}
/**
 * @param {any} object
 */
function _float(object) {
  return new _Float(parseFloat(String(object)) || 0.0);
}

var _flipSync = true;
function _flip() {
  if (_flipSync) {
    _flipSync = false;
    const back = _backbuffer();
    const front = _frontbuffer();
    const temp = _graphicsCreate(front.canvas.width, front.canvas.height, "_tempflip");

    temp.context.drawImage(front.canvas, 0, 0);

    front.context.clearRect(0, 0, front.canvas.width, front.canvas.height);
    front.context.drawImage(back.canvas, 0, 0);

    back.context.clearRect(0, 0, back.canvas.width, back.canvas.height);
    back.context.drawImage(temp.canvas, 0, 0);
  }
}

const _first = (/** @type {any} */ obj) => {
  obj._type._index = 0;
  return obj._sub[obj._type._index];
};

async function _filetype(filename) {
  const path = _normalizeFile(filename);
  const folder = path.replace(/^(.*[/\\])(.*?)$/, "$1");
  const file = path.replace(/^(.*[/\\])(.*?)$/, "$2");
  return _readDirList[folder] && _readDirList[folder].file && _readDirList[folder].file.find((res) => res.name === file)
    ? _readDirList[folder].file.find((res) => res.name === file).type
    : Number(await _postCommand("filetype", { folder: folder, filename: file }));
}

async function _filesize(filename) {
	const res = await _getCommand('filesize', filename)
	return res;
}
function _filepos(stream) {
	return stream.position;
}
function _exp(x) {
	return Math.exp(x);
}
//TO BE DONE
function _execfile(file) {}

function _eof(stream) {
	const output = stream.data;
	return stream.position >= output.length;
}
function _endgraphics() {
	_graphics(400, 300);
}
function _end() {
  _debuglog("Program has ended.");
  throw new Error();
}

const _each = (/** @type {any} */ obj) => {
  return obj._sub;
};

var _drawmovierate = _millisecs();
/**
 * @param {{name: string, data: HTMLVideoElement}} movie
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function _drawmovie(movie, x, y, width, height, buffer = _currentGraphicsBuffer) {
  if (movie && movie.data) {
    if (!movie.data.paused && !movie.data.ended) {
      buffer.context.drawImage(movie.data, x, y, width, height);
      let rate = 60 / (_millisecs() - _drawmovierate);
      rate = rate < 0.1 ? 0.1 : rate;
      rate = rate > 10 ? 10 : rate;
      movie.data.playbackRate = rate;
      _drawmovierate = _millisecs();
    }
  }
}

function _drawimagerect(image, x, y, x2, y2, width, height, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect(image, x, y, x2, y2, width, height, frame, false, buffer);
}

function _drawimage(image, x, y, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect(image, x, y, 0, 0, image[frame].canvas.width, image[frame].canvas.height, frame, false, buffer);
}

//_drawblockrect(srcImage, targetX, targetY, srcX, srcY, srcWidth, srcHeight, srcFrame, block, targetBuffer);
function _drawblockrect(image, x, y, x2, y2, width, height, frame = 0, block = true, buffer = _currentGraphicsBuffer) {
  if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
    const scaleX = image[frame].scaleX;
    const scaleY = image[frame].scaleY;
    const targetX = x + _originX - image[frame].x;
    const targetY = y + _originY - image[frame].y;
    const translateX = x + width / 2;
    const translateY = y + height / 2;
    if (!_tFormFilterEnabled) {
      buffer.context.imageSmoothingEnabled = false;
      buffer.context.webkitImageSmoothingEnabled = false;
      buffer.context.mozImageSmoothingEnabled = false;
      buffer.context.oImageSmoothingEnabled = false;
      buffer.context.msImageSmoothingEnabled = false;
    }
    buffer.context.save();
    buffer.context.translate(x, y);
    buffer.context.rotate(image[frame].rotate);
    buffer.context.translate(width / 2, height / 2);
    buffer.context.transform(image[frame].transform11, image[frame].transform12, image[frame].transform21, image[frame].transform22, 0, 0);
    buffer.context.translate(-translateX, -translateY);
    buffer.context.scale(scaleX, scaleY);
    if (block) {
      buffer.context.fillStyle = "rgb(0, 0, 0)";
      buffer.context.fillRect(targetX / scaleX, targetY / scaleY, width, height);
    }
    buffer.context.drawImage(image[frame].canvas, x2, y2, width, height, targetX / scaleX, targetY / scaleY, width, height);
    buffer.context.restore();
  }
}

function _drawblock(image, x, y, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect(image, x, y, 0, 0, image[frame].canvas.width, image[frame].canvas.height, frame, true, buffer);
}

function _dottedip(index) {
	return ((index >>> 24) + '.' + (index >> 16 & 255) + '.' + (index >> 8 & 255) + '.' + (index & 255));
}
const _dim = (/** @type {number[]} */ ...dimensions) => {
  const /** @type {function} */ newArray = (/** @type {string | any[]} */ dimensions, /** @type {any[]} */ array = []) => {
      let arr;
      let rest;
      if (dimensions.length >= 0) {
        const len = dimensions[0];
        rest = dimensions.slice(1);
        arr = [];
        for (let d = 0; d <= len; d++) {
          arr[d] = newArray(rest, array);
        }
      } else {
        arr = 0;
      }
      return arr;
    };

  const getArray = (array, indices) => {
    var returnValue = 0;
    if (indices.length === 0) {
      returnValue = array;
    } else {
      const index = Math.floor(indices[0].valueOf());
      if (array[index]) {
        returnValue = getArray(array[index], indices.slice(1));
      }
    }
    return returnValue;
  };
  return newArray(dimensions);

  //   return function () {
  //     return {
  //   /** @type {number[]} */ array: newArray(dimensions),
  //   set(/** @type {any} */ value, /** @type {number[]} */ ...location) {
  //     return this.array;
  //   },
  // get: function (/** @type {number[]} */ ...arguments) {
  //   const position = [...arguments];
  //   let result = getArray(this.array, position);
  //   return isNaN(result) ? result : Number(result);
  // },
  //     };
  //   };
};

async function _deletefile(filename) {
	await _postCommand('deletefile', { filename: filename })
}
async function _deletedir(path) {
	await _postCommand('deletedir', { path: path });
}
const _delete = (/** @type {any} */ obj) => {
  obj._sub.splice(obj._index, 1);
  return null;
};

/**
 * @param {number} ms
 */
async function _delay(ms) {
  let timer = _millisecs();
  _delayTimer = timer;
  while (await _async()) {
    timer = _millisecs();
    if (timer - _delayTimer >= ms) {
      break;
    }
  }
}

var _debugLogCount = 0;
/**
 * @param {string} text
 */
function _debuglog(text, color = "#fff") {
  const debug = document.querySelector(".debug");
  debug.innerHTML += `<span style="color:${color};" id="debug-log-${_debugLogCount}"></span>\n`;
  ((txt, i) => {
    setTimeout(() => {
      const debugSpan = document.querySelector(`.debug span#debug-log-${i}`);
      if (debugSpan) {
        debugSpan.innerHTML += txt;
      }
      document.querySelector(".debug").scrollTo(0, document.querySelector(".debug").scrollHeight);
    }, 100);
  })(text, _debugLogCount);
  _debugLogCount += 1;
}

/**
 * @param {string} err
 */
function _errorlog(err, log = false) {
  if (log) console.error(err);
  try {
    const error = err.replace(/[\t ]+/gm, " ");
    const message = error.replace(/^.*: *([\w\W]*?) *\n? *\bat\b[\w\W]*$/g, "$1");
    const file = error.replace(/^.* +at +https?:\/\/.*\/(.*?)\.js:.*$/g, "$1").toUpperCase();
    const line = error.replace(/^.*: *([\w\W]*?) *\n? *\bat\b .*?:(\d+?):[\w\W]*$/g, "$2");
    _debuglog(`${message} at line ${line}`, "#f57");
  } catch (e) {}
}

/**
 * @param {string} label
 * @param {any[]} data
 */
function _data(label, ...data) {
  _dataList.push(`__${label}`, ...data);
}

function _currenttime() {
	const date = new Date();
	const hour = `0${date.getHours()}`.slice(-2);
	const minute = `0${date.getMinutes()}`.slice(-2);
	const second = `0${date.getSeconds()}`.slice(-2);
	return `${hour}:${minute}:${second}`;
}
function _currentdir() {
  return _currentDirCached;
}

function _currentdate() {
	const date = new Date();
	const day = `0${date.getDate()}`.slice(-2);
	const month = date.toLocaleString('en-us', { month: 'short' });
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
}
function _createtimer(frequency) {
	return {
		frequency: frequency,
		millisecs: _millisecs()
	}
}
async function _createtcpserver(port) {
	return await _postCommand('createtcpserver', { port: port });
}
function _createimage(width, height, frames = 1) {
  if (_currentGraphicsBuffer.context) {
    const id = `createimage_${_millisecs()}`;
    const buffers = [];
    for (let f = 0; f < frames; f++) {
      const buffer = _graphicsCreate(width, height, id);
      buffer.id = `${id}_${f}`;
      buffers.push(buffer);
    }
    return buffers;
  }
  return null;
}

async function _createdir(path) {
	await _postCommand('createdir', { path: path });
}
function _createbank(size = 0) {
	return {
		name: 'bank',
		data: Array(size + 1).join(_chr(0)),
		position: 0,
		readonly: false
	}
}
async function _counthostips(host) {
	return Number(await _getCommand('counthostips', host));
}
function _countgfxmodes() {
	return _graphicsModeList.length - 1;
}
// N/A
function _countgfxdrivers() {
  return 1;
}

function _cos(degrees) {
	return Math.cos(degrees * (Math.PI / 180));
}
function _copystream(streamFrom, streamTo, size) {
	_copybank(streamFrom, 0, streamTo, 0, size);
	streamTo.position += size;
}
function _copyrect(x, y, width, height, x2, y2, buffer = _currentGraphicsBuffer, buffer2 = buffer) {
  _drawblockrect([buffer], x2, y2, x, y, width, height, 0, true, buffer2);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {GraphicsBuffer} buffer
 * @param {number} x2
 * @param {number} y2
 */
function _copypixelfast(x, y, buffer, x2, y2, buffer2 = _currentGraphicsBuffer) {
  if (buffer.context && buffer2.image && buffer2.locked) {
    const data = buffer.context.getImageData(x, y, 1, 1).data;
    // const image = buffer2.context.createImageData(1, 1);
    var index = 0; //_dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
    var index2 = _dimGetIndex([buffer2.canvas.width - 1, buffer2.canvas.height - 1], [x2 + _originX, y2 + _originY]) * 4;
    buffer2.image.data[index2 + 0] = data[index + 0];
    buffer2.image.data[index2 + 1] = data[index + 1];
    buffer2.image.data[index2 + 2] = data[index + 2];
    buffer2.image.data[index2 + 3] = data[index + 3];
  }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {GraphicsBuffer} buffer
 * @param {number} x2
 * @param {number} y2
 */
function _copypixel(x, y, buffer, x2, y2, buffer2 = _currentGraphicsBuffer) {
  if (buffer.context) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    buffer2.context.fillStyle = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    buffer2.context.fillRect(x2 + _originX, y2 + _originY, 1, 1);
  }
}

function _copyimage(image) {
	const result = [];
	for (let i = 0, _length = image.length; i < _length; i++) {
		const buffer = Object.assign({}, image[i]);
		buffer.id += '_copy';
		result.push(buffer);
	}
	return result;
}
async function _copyfile(from, to) {
	await _postCommand('copyfile', {
		from: from,
		to: to
	})
}
function _copybank(bankFrom, offsetFrom, bankTo, offsetTo, size) {
	const string = bankFrom.data.substring(offsetFrom, offsetFrom + size);
	bankTo.data = bankTo.data.substr(0, offsetTo) + string + bankTo.data.substr(offsetTo + string.length);
}
async function _commandline() {
	return await _getCommand('commandline');
}
function _colorred() {
	return _getColorRed;
}
function _colorgreen() {
	return _getColorGreen;
}
function _colorblue() {
	return _getColorBlue;
}
function _color(r, g, b) {
	_getColorRed = r;
	_getColorGreen = g;
	_getColorBlue = b;
}

function _colorRGB() {
	return 'rgb(' + _getColorRed + ', ' + _getColorGreen + ', ' + _getColorBlue + ')';
}
var _clsColorRGB = '';
function _clscolor(r, g, b) {
	_clsColorRGB = 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function _cls(buffer = _currentGraphicsBuffer, resetCursor = true) {
  if (buffer.context && !buffer.locked) {
    buffer.context.fillStyle = _clsColorRGB;
    buffer.context.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    if (resetCursor) {
      _printX = 0;
      _printY = 0;
      _writeX = 0;
    }
  }
}

async function _closetcpstream(stream) {
	await _postCommand('closetcpstream', stream);
	return undefined;
}
async function _closetcpserver(server) {
	await _postCommand('closetcpserver', server);
	return undefined;
}
function _closemovie(movie) {
	delete movie;
	movie = undefined;
	return movie;
}
async function _closefile(stream) {
	if (!stream.readonly) {
		await _postCommand('writefile', {
			name: stream.name,
			data: stream.data
		});
	}
}
function _closedir(directory) {
	directory = undefined;
	return directory;
}
function _chr(code) {
	return String.fromCharCode(code);
}

function _channelvolume(channel, volume) {
	channel.sound.volume(0 + volume, channel.id);
}
function _channelplaying(channel) {
	return channel && channel.sound && channel.sound.playing(channel.id) ? 1 : 0;
}
function _channelpitch(channel, pitch) {
	channel.sound.rate(0 + pitch / channel.sound._sampleRate, channel.id);
}
function _channelpan(channel, pan) {
	channel.sound.stereo(0 + pan, channel.id);
}
async function _changedir(directory) {
  const path = _normalizeFile(directory);
  const result = await _postCommand("changedir", { directory: path });
  if (result !== 0) {
    _currentDirCached = result;
  }
}

function _ceil(num) {
	return Math.ceil(num);
}
//TO BE DONE
function _calldll() { }
function _bin(integer) {
	return (Array(33).join('0') + (integer >>> 0).toString(2)).slice(-32);
}
const _before = (/** @type {any} */ obj) => {
  obj._type._index = obj._type._index > 0 ? obj._type._index - 1 : 0;
  return obj._sub[obj._type._index];
};

function _banksize(bank) {
	return bank && bank.data ? bank.data.length : 0;
}
function _backbuffer() {
  return _graphicsBufferList["_back"];
}

//TO BE DONE
function _availvidmem() {
	return -670336;
}
function _automidhandle(flag) {
	_graphicsMidHandle = flag
}
function _asc(code) {
	return code.charCodeAt(0);
}

var _appTitlePrompt = undefined;

function _apptitle(title, prompt) {
  document.title = `Blitz3D - ${title}`;
  if (prompt) {
    _appTitlePrompt = prompt;
    window.onbeforeunload = (event) => {
      event = event || window.event;
      if (event) {
        event.returnValue = _appTitlePrompt;
      }
      return _appTitlePrompt;
    };
  }
}

const _after = (/** @type {any} */ obj) => {
  obj._type._index = obj._type._index < obj._sub.length - 1 ? obj._type._index + 1 : obj._sub.length;
  return obj._sub[obj._type._index];
};

async function _accepttcpstream(handle) {
	return await _postCommand('accepttcpstream', { name: handle });
}
function _abs(number) {
	return Math.abs(number);
}
function _atan2(y, x) {
	return Math.atan2(y, x) * (180 / Math.PI);
}
function _atan(s) {
	return Math.atan(s) * (180 / Math.PI);
}
function _asin(s) {
	return Math.asin(s) * (180 / Math.PI);
}
function _acos(s) {
	return Math.acos(s) * (180 / Math.PI);
}