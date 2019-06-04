function _stringwidth(string) {
	if (_graphicsContext) {
		return Math.round(_graphicsContext.measureText(string).width);
	}
}