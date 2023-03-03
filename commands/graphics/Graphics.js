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
