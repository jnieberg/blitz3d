var _setFontCurrent = {
	family: 'arial',
	size: 16,
	bold: false,
	italic: false,
	underline: false
};
function SetFont(font) {
	if (_graphicsContext) {
		_setFontCurrent = font;
		const weightS = font.bold ? 'bold' : '';
		const italicS = font.italic ? 'italic' : '';
		const underlinedS = font.underline ? 'underline' : '';
		_graphicsContext.font = `${italicS} ${weightS} ${font.size}px "${font.family}"`;
	}
}
