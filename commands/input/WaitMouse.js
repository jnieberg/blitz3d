function _waitmouse() {
	var _waitMouseEvent = undefined;
	function getCode(event) {
		event.preventDefault();
		_waitMouseEvent = event;
	}
	function done() {
		const mouseIndex = [0, 1, 3, 2];
		document.removeEventListener('mousedown', getCode);
		return mouseIndex[_waitMouseEvent.which];
	}
	document.addEventListener('mousedown', getCode);
	return new Promise((resolve) => {
		setInterval(() => {
			if (_waitMouseEvent) {
				resolve(done());
			}
		});
	});
}