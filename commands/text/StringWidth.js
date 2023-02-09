function _stringwidth(string) {
  if (_currentGraphicsBuffer.context) {
    return Math.round(_currentGraphicsBuffer.context.measureText(string).width);
  }
}
