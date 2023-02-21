/**
 * @param {any} object
 */
function _float(object) {
  return new _Float(parseFloat(String(object)) || 0.0);
}
