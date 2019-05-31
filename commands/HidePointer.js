function _hidepointer() {
	const canvas = _frontbuffer().canvas;
	canvas.setAttribute('style', 'cursor:none;');
}