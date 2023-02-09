var _getColorRed = 0;
var _getColorGreen = 0;
var _getColorBlue = 0;

function _getcolor(x, y, buffer = _currentGraphicsBuffer) {
  if (buffer.context && !buffer.locked) {
    var data = buffer.context.getImageData(x + _originX, y + _originY, 1, 1).data;
    _getColorRed = data[0];
    _getColorGreen = data[1];
    _getColorBlue = data[2];
  }
}
