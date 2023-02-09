async function _readfile(filename) {
  let path = _normalizeFile(filename);
  return {
    name: path,
    data: await _getCommand("openfile", path),
    position: 0,
    readonly: true,
  };
}
