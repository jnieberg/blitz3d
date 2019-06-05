var _getMouseEvent = undefined;
function _getmouse() {
	function getCode(event) {
		_getMouseEvent = event;
	}
	_addListener('mousedown', getCode, 'getmouse');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (_getMouseEvent) {
				const mouseIndex = [0, 1, 3, 2];
				resolve(mouseIndex[_getMouseEvent.which || _getMouseEvent.button + 1 || 0]);
				_getMouseEvent = undefined;
			} else {
				resolve(0);
			}
		});
	});
}
