/**
 * @param {string} directory
 */
async function _readdir(directory = "") {
  let path = _normalizeFile(directory);
  const dir = await _postCommand("readdir", { folder: path });
  if (dir !== "0") {
    _readDirList[dir.folder] = dir;
    return _readDirList[dir.folder];
  }
  return 0;
}
