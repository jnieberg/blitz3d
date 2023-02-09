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
