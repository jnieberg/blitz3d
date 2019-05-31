function _flip() {
	const back = _backbuffer();
	const front = _frontbuffer();
	// _saveScreen(back);
	//_cls(back);
	front.context.drawImage(back.canvas, 0, 0);
	// _loadScreen(0, 0, front);
}