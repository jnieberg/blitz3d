var _backupScreenImg = undefined;
function _saveScreen() {
	_backupScreenImg = _graphicsContext.getImageData(0, 0, _graphicsCanvas.width, _graphicsCanvas.height);
}

function _loadScreen(xOff, yOff) {
	const x = xOff || 0;
	const y = yOff || 0;
	if (!_backupScreenImg) {
		_saveScreen();
	}
	cls();
	_graphicsContext.putImageData(_backupScreenImg, x, y);
}
