/**
 * @param {MouseEvent} event
 */
function _waitMouseGetCode(event) {
  _waitMouseEvent = event;
}

function _mousewait() {
  function done() {
    const mouseIndex = [0, 1, 3, 2];
    const result = mouseIndex[_waitMouseEvent.which || _waitMouseEvent.button + 1 || 0];
    _waitMouseEvent = undefined;
    return result;
  }
  return new Promise((resolve) => {
    _waitMouseInterval = setInterval(() => {
      if (_waitMouseEvent) {
        clearInterval(_waitMouseInterval);
        resolve(done());
        //_removeListener('mousedown', 'waitmouse');
      }
    });
  });
}
