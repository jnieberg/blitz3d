function _fontwidth() {
  if (_currentGraphicsBuffer.context) {
    return Math.round(_currentGraphicsBuffer.context.measureText("W").width);
  }
}
