function _readpixelfast(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context && buffer.locked) {
    var data = buffer.image.data;
    var index = _dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
    return (data[index + 0] || 0) * 65536 + (data[index + 1] || 0) * 256 + (data[index + 2] || 0) * 1;
  }
}
