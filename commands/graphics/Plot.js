function _plot(x, y) {
  if (_currentGraphicsBuffer.context && !_currentGraphicsBuffer.locked) {
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.fillRect(x + _originX, y + _originY, 1, 1);
  }
}
