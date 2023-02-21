async function _writefloat(stream, float, offset) {
  const farr = new Float32Array(1);
  farr[0] = float % _FLOAT_MAX;
  var barr = new Int8Array(farr.buffer);
  const string = _bytes2string(barr.toString().split(","), 4);
  return await _writeline(stream, string, offset);
}
