function _oval(x, y, w, h, solid = true) {
  if (_bufferEditable() && w > 0 && h > 0) {
    _currentGraphicsBuffer.context.fillStyle = _colorRGB();
    _currentGraphicsBuffer.context.strokeStyle = _colorRGB();
    _currentGraphicsBuffer.context.beginPath();
    _currentGraphicsBuffer.context.ellipse(x + w / 2 + _originX, y + h / 2 + _originY, w / 2, h / 2, 0, 0, 2 * Math.PI);
    if (solid) {
      _currentGraphicsBuffer.context.fill();
    } else {
      _currentGraphicsBuffer.context.stroke();
    }
  }
}
