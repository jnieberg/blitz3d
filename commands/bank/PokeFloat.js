function _pokefloat(bank, offset, float) {
	if (float instanceof Float) {
		float = float.value;
	}
	const view = new DataView(bank);
	view.setFloat32(offset, float);
}