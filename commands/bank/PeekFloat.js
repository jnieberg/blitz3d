function _peekfloat(bank, offset) {
	const view = new DataView(bank);
	return view.getFloat32(offset);
}