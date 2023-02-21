/**
 * @param {KeyboardEvent} event
 */
function _waitKeyGetCode(event) {
  _waitKeyEvent = event;
}

function _waitkey(char = false) {
  /**
   * @param {boolean} [key]
   */
  function done(key) {
    const result = key ? _waitKeyEvent.key : _waitKeyEvent.key.length === 1 ? _asc(_waitKeyEvent.key) : _waitKeyEvent.keyCode;
    _waitKeyEvent = undefined;
    return result;
  }
  return new Promise((resolve) => {
    _waitKeyInterval = setInterval(() => {
      if (_waitKeyEvent) {
        if (char) {
          if (_waitKeyEvent.location === 0) {
            clearInterval(_waitKeyInterval);
            resolve(done(true));
          } else {
            _waitKeyEvent = undefined;
          }
        } else {
          clearInterval(_waitKeyInterval);
          resolve(done());
        }
      }
    });
  });
}
