/**
 * @param {number} x
 * @param {number} y
 * @param {GraphicsBuffer} buffer
 * @param {number} x2
 * @param {number} y2
 */
function _copypixelfast(x, y, buffer, x2, y2, buffer2 = _currentGraphicsBuffer) {
  if (buffer.context && buffer2.image && buffer2.locked) {
    const data = buffer.context.getImageData(x, y, 1, 1).data;
    // const image = buffer2.context.createImageData(1, 1);
    var index = 0; //_dimGetIndex([buffer.canvas.width - 1, buffer.canvas.height - 1], [x + _originX, y + _originY]) * 4;
    var index2 = _dimGetIndex([buffer2.canvas.width - 1, buffer2.canvas.height - 1], [x2 + _originX, y2 + _originY]) * 4;
    buffer2.image.data[index2 + 0] = data[index + 0];
    buffer2.image.data[index2 + 1] = data[index + 1];
    buffer2.image.data[index2 + 2] = data[index + 2];
    buffer2.image.data[index2 + 3] = data[index + 3];
  }
}
