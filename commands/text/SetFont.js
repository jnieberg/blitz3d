var _setFontCurrent = {
	family: 'courier',
	size: 13,
	height: 17,
	bold: false,
	italic: false,
	underline: false
};

function _setfont(font, buffer = _graphicsBuffer) {
	if (buffer.context) {
		_setFontCurrent = font;
		const weightS = font.bold ? 'bold ' : '';
		const italicS = font.italic ? 'italic ' : '';
		const underlinedS = font.underline ? 'underline ' : '';
		buffer.context.font = `${italicS}${weightS}${font.size}px "${font.family}"`;
	}
}