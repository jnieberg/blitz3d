function _fontwidth() {
	if (_graphicsContext) {
		return Math.round(_graphicsContext.measureText('W').width);
	}
}