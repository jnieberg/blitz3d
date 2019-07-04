function _unlockbuffer(buffer = _graphicsBuffer) {
	buffer.locked = false;
	buffer.context.putImageData(buffer.image, 0, 0);
}