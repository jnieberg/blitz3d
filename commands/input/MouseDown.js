var _mouseDownThis = 0;
var _mouseDownCheck = 0;
function _mouseDownGetMouseDown(event) {
	_mouseDownThis = event;
}
function _mouseDownRemoveMouseDown(event) {
	_mouseDownThis = 0;
}
_addListener('mousedown', _mouseDownGetMouseDown, 'mousedown');
_addListener('mouseup', _mouseDownRemoveMouseDown, 'mousedown');

function _mousedown(button) {
	_mouseDownCheck = button;
	function done() {
		const mouseIndex = [0, 1, 3, 2];
		return _mouseDownCheck === mouseIndex[_mouseDownThis.which || _mouseDownThis.button + 1 || 0];
	}
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		resolve(done());
	// 	});
	// });
	return done();
}
