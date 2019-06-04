function _waitmouse() {
	var _waitMouseEvent = undefined;
	function getCode(event) {
		event.preventDefault();
		_waitMouseEvent = event;
	}
	function done() {
		const mouseIndex = [0, 1, 3, 2];
		_removeAllListeners(document, 'mousedown');
		return mouseIndex[_waitMouseEvent.which];
	}
	_addListener(document, 'mousedown', getCode);
	return new Promise((resolve) => {
		setInterval(() => {
			if (_waitMouseEvent) {
				resolve(done());
			}
		});
	});
}