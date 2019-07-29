var _mouseDownThis = 0;
var _mouseDownCheck = 0;
function _mouseDownGetMouseDown(event) {
	//event.preventDefault();
	_mouseDownThis = event;
}
function _mouseDownRemoveMouseDown() {
	_mouseDownThis = 0;
}
_addListener('mousedown', _mouseDownGetMouseDown, 'mousedown');
_addListener('mouseup', _mouseDownRemoveMouseDown, 'mousedown');

function _mousedown(button) {
	const mouseIndex = [0, 1, 3, 2];
	const res = button === mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
	_mouseDownCheck = 0;
	return res;
}
