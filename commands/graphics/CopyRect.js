function _copyrect(x, y, width, height, x2, y2, buffer = _currentGraphicsBuffer, buffer2 = buffer) {
  _drawblockrect([buffer], x2, y2, x, y, width, height, 0, true, buffer2);
}
