function _unlockbuffer(buffer = _currentGraphicsBuffer) {
  buffer.locked = false;
  buffer.context.putImageData(buffer.image, 0, 0);
}
