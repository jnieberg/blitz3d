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
    };
    if (id === "_front") {
      buffer.canvas = document.querySelector("#blitz");
    } else if (id === "_back") {
      buffer.canvas = document.querySelector("#blitzBack");
    } else {
      buffer.canvas = document.createElement("canvas");
    }
    buffer.context = buffer.canvas.getContext("2d");
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
  if (id === "_front") {
    buffer.context.restore();
    buffer.context.save();
    if (mode === 1) {
      document.querySelector("#blitz").classList.add("full");
      const w = window.innerWidth;
      const h = window.innerHeight;
      buffer.canvas.width = w;
      buffer.canvas.height = h;
      buffer.context.scale(w / width, h / height);
    } else if (mode === 0 || mode === 2 || mode === 3) {
      buffer.canvas.width = width;
      buffer.canvas.height = height;
      document.querySelector("#blitz").classList.remove("full");
    }
  }
  buffer.context.textBaseline = "top";
  buffer.context.textAlign = "left";
  buffer.context.lineWidth = 1;
  buffer.context.clearRect(0, 0, width, height);
  _setfont(_setFontCurrent, buffer);
  return buffer;
}
