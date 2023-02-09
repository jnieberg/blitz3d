function _drawimagerect(image, x, y, x2, y2, width, height, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect(image, x, y, x2, y2, width, height, frame, false, buffer);
}
