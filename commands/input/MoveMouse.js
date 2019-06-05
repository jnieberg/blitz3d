function _movemouse(x, y) {
	_mouseXPosition = x;
	_mouseYPosition = y;
	document.dispatchEvent(new MouseEvent('mousemove'));
}