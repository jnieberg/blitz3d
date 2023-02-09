function _readbyte(stream, position) {
  position = typeof position === "undefined" ? stream.position : position;
  if (typeof stream === "string") {
    console.log(stream);
  }
  const string = stream.data.substring(position, position + 1);
  stream.position += string.length;
  return string.charCodeAt(0); // + _BYTE_MAX) % _BYTE_MAX;
}
