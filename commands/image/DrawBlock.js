function _drawblock(image, x, y, frame = 0, buffer = _currentGraphicsBuffer) {
  _drawblockrect(image, x, y, 0, 0, image[frame].canvas.width, image[frame].canvas.height, frame, true, buffer);
}
