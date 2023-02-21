function _cls(buffer = _currentGraphicsBuffer) {
  if (buffer.context && !buffer.locked) {
    buffer.context.fillStyle = _clsColorRGB;
    buffer.context.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    _printX = 0;
    _printY = 0;
    _writeX = 0;
  }
}
