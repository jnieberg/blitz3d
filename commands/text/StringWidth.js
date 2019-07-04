function _stringwidth(string) {
	if (_graphicsBuffer.context) {
		return Math.round(_graphicsBuffer.context.measureText(string).width);
	}
}