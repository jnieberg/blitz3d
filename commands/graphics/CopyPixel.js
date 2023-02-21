/**
 * @param {number} x
 * @param {number} y
 * @param {GraphicsBuffer} buffer
 * @param {number} x2
 * @param {number} y2
 */
function _copypixel(x, y, buffer, x2, y2, buffer2 = _currentGraphicsBuffer) {
  if (buffer.context) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    buffer2.context.fillStyle = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    buffer2.context.fillRect(x2 + _originX, y2 + _originY, 1, 1);
  }
}
