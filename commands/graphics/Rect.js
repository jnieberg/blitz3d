function _rect(x, y, w, h, solid = true) {
  if (_currentGraphicsBuffer.context && w > 0 && h > 0) {
    if (solid) {
      _currentGraphicsBuffer.context.fillStyle = _colorRGB();
      _currentGraphicsBuffer.context.fillRect(x + _originX, y + _originY, w, h);
    } else {
      _currentGraphicsBuffer.context.translate(0.5, 0.5);
      _currentGraphicsBuffer.context.strokeStyle = _colorRGB();
      _currentGraphicsBuffer.context.beginPath();
      _currentGraphicsBuffer.context.rect(x + _originX, y + _originY, w - 1, h - 1);
      _currentGraphicsBuffer.context.stroke();
      _currentGraphicsBuffer.context.translate(-0.5, -0.5);
    }
  }
}
