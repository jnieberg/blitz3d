function _viewport(x, y, width, height, buffer = _currentGraphicsBuffer) {
  if (buffer.context && !buffer.locked) {
    buffer.context.restore();
    buffer.context.save();
    let region = new Path2D();
    region.rect(x + _originX, y + _originY, width, height);
    buffer.context.clip(region);
  }
}
