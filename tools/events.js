var _eventCanvas = undefined;
var _mouseElement = undefined;

window.onload = () => {
	_mouseElement = document.querySelector('#blitzPointer');
	_eventCanvas.requestPointerLock = _eventCanvas.requestPointerLock || _eventCanvas.mozRequestPointerLock || _eventCanvas.webkitRequestPointerLock;
	document.pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

	document.addEventListener('mousemove', (event) => {
		var rect = _eventCanvas.getBoundingClientRect();
		_mouseXSpeedOffset = event.movementX;
		_mouseYSpeedOffset = event.movementY;
		_mouseXPosition += _mouseXSpeedOffset;
		_mouseYPosition += _mouseYSpeedOffset;
		// if (_mouseXPosition < 0 || _mouseXPosition > _eventCanvas.width || _mouseYPosition < 0 || _mouseYPosition > _eventCanvas.height) {
		// 	document.exitPointerLock();
		// }
		_mouseXPosition = _mouseXPosition < 0 ? 0 : _mouseXPosition > _eventCanvas.width ? _eventCanvas.width : _mouseXPosition;
		_mouseYPosition = _mouseYPosition < 0 ? 0 : _mouseYPosition > _eventCanvas.height ? _eventCanvas.height : _mouseYPosition;
		_mouseElement.setAttribute('style', `left: ${_mouseXPosition + rect.left}px; top: ${_mouseYPosition + rect.top}px;`);
	});
	document.addEventListener('wheel', (event) => {
		_mouseZSpeedOffset = -event.deltaY / 100;
		_mouseZPosition += _mouseZSpeedOffset;
	});

	_eventCanvas.oncontextmenu = function (e) {
		return false;
	};

	_eventCanvas.addEventListener('click', (event) => {
		_lockPointer();
	});
};

window.onerror = (err, url, line) => {
	_debuglog(`${err} (line ${line})`, '#f57');
}

document.addEventListener('pointerlockchange', (event) => {
	if (document.pointerLockElement === _eventCanvas) {
		_mouseElement.classList.add('show');
	} else {
		_mouseElement.classList.remove('show');
	}
});