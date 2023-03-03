function _mouseDownGetMouseDown(event) {
  //event.preventDefault();
  _mouseDownThis = event;
}
function _mouseDownRemoveMouseDown() {
  _mouseDownThis = null;
}

function _mousedown(button) {
  if (_mouseDownThis) {
    const mouseIndex = [0, 1, 3, 2];
    const res = button === mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
    // _mouseDownCheck = null;
    return res ? 1 : 0;
  }
  return 0;
}
