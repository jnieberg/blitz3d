function _fontwidth() {
	if (_graphicsBuffer.context) {
		return Math.round(_graphicsBuffer.context.measureText('W').width);
	}
}