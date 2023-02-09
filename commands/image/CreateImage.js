function _createimage(width, height, frames = 1) {
  if (_currentGraphicsBuffer.context) {
    const id = `createimage_${_millisecs()}`;
    const buffers = [];
    for (let f = 0; f < frames; f++) {
      const buffer = _graphicsCreate(width, height, id);
      buffer.id = `${id}_${f}`;
      buffers.push(buffer);
    }
    return buffers;
  }
  return null;
}
