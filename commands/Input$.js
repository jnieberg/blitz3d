var _inputText = '';

async function _input$(input) {
	_inputText = ''
	_saveScreen();
	_print(`${input}`, true);
	function blink() {
		_rect(_printX + _graphicsContext.measureText(input + _inputText).width + 1, _printY, _setFontCurrent.height * .5, _setFontCurrent.height, true);
		setTimeout(() => {
			const col = _colorRGB;
			_color(0, 0, 0);
			_rect(_printX + _graphicsContext.measureText(input + _inputText).width, _printY - 1, _setFontCurrent.height * .5 + 2, _setFontCurrent.height + 2, true);
			_colorRGB = col;
		}, 500);
	}
	blink();
	const cursorTimer = setInterval(() => {
		blink();
	}, 1000);
	while (true) {
		const key = await _waitkey(true);
		if (key === 'Backspace' || key === 'Delete') {
			_inputText = _inputText.slice(0, _inputText.length - 1);
		} else if (key === 'Enter') {
			return new Promise((resolve, reject) => {
				clearInterval(cursorTimer);
				_loadScreen();
				_print(`${input}${_inputText}`, true);
				resolve(_inputText);
				_printY = _printY + _setFontCurrent.height;
			});
		} else if (key.length === 1) {
			_inputText = _inputText + key;
		}
		_loadScreen();
		_rect(_printX + _graphicsContext.measureText(input + _inputText).width + 1, _printY, _setFontCurrent.height * .5, _setFontCurrent.height, true);
		_print(`${input}${_inputText}`, true);
	}
}