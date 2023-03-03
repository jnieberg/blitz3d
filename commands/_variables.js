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
