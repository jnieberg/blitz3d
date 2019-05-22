function LoadFont(family, size, bold, italic, underline) {
	if (_graphicsContext) {
		return {
			family: family,
			size: size,
			bold: bold,
			italic: italic,
			underline: underline
		};
	}
}
