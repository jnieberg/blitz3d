function LoadFont(family, size, weight, italic, underlined) {
	if (_graphicsContext) {
		const weightS = weight ? 'bold' : '';
		const italicS = italic ? 'italic' : '';
		const underlinedS = underlined ? 'underline' : '';
		return `${italicS} ${weightS} ${size}px "${family}"`;
	}
}
