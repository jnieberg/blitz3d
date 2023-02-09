function _readpixel(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    return (data[0] || 0) * 65536 + (data[1] || 0) * 256 + (data[2] || 0) * 1;
  }
}
