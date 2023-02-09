function _tileblock(image, x = 0, y = 0, frame = 0, buffer = _currentGraphicsBuffer) {
  if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
    const pattern = buffer.context.createPattern(image[frame].canvas, "repeat");
    buffer.context.fillStyle = "rgb(0, 0, 0)";
    buffer.context.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    buffer.context.translate(x + _originX - image[frame].x, y + _originY - image[frame].y);
    buffer.context.rect(-x, -y, buffer.canvas.width - _originX + image[frame].x, buffer.canvas.height - _originY + image[frame].y);
    buffer.context.fillStyle = pattern;
    buffer.context.fill();
    buffer.context.translate(-(x + _originX - image[frame].x), -(y + _originY - image[frame].y));
  }
}
