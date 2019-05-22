function FreeFont(font) {
	if (_setFontCurrent === font) {
		_setFontCurrent = {
			family: 'arial',
			size: 16,
			bold: false,
			italic: false,
			underline: false
		};
	}
}
