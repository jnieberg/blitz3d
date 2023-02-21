/**
 * @param {number} start
 * @param {number} end
 */
function _rnd(start = 0.0, end = 1.0) {
  // if (start instanceof _Float) {
  //   start = start.value;
  // }
  // if (end instanceof _Float) {
  //   end = end.value;
  // } else {
  //   // end = end + 1;
  // }
  if (start >= end) {
    end = start;
    start = 0.0;
  }
  const result = _seedRndFn() * (end - start) + start;
  // if (start instanceof _Float && end instanceof _Float) {
  //   return new _Float(result);
  // }
  return result;
}
