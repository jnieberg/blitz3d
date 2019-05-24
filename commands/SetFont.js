var _setFontCurrent = {
	family: 'courier new',
	size: 13,
	height: 13,
	bold: false,
	italic: false,
	underline: false
};
function setfont(font) {
	if (_graphicsContext) {
		_setFontCurrent = font;
		const weightS = font.bold ? 'bold' : '';
		const italicS = font.italic ? 'italic' : '';
		const underlinedS = font.underline ? 'underline' : '';
		_graphicsContext.font = `${italicS} ${weightS} ${font.size}px "${font.family}"`;
	}
}
