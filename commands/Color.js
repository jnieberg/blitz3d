function Color(r, g, b) {
	if (_graphicsContext) {
		_graphicsContext.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		_graphicsContext.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
}
