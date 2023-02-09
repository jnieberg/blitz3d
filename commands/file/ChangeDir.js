async function _changedir(directory) {
  const path = _normalizeFile(directory);
  const result = await _postCommand("file/changedir", { directory: path });
  if (result !== 0) {
    _currentDirCached = result;
  }
}
