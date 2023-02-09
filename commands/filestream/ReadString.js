function _readstring(stream) {
  var length = _string2int(stream.data.substring(stream.position, stream.position + 4));
  const output = stream.data.substring(stream.position + 4, stream.position + 4 + length);
  stream.position += length + 4;
  return output;
}
