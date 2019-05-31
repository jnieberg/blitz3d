window.onload = () => {
	var _eventCanvas = _frontbuffer().canvas;
	_eventCanvas.addEventListener('mousemove', (event) => {
		var rect = event.target.getBoundingClientRect();
		_mouseXPosition = event.clientX - rect.left;
		_mouseYPosition = event.clientY - rect.top;
	});
};