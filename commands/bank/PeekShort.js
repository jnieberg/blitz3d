function _peekshort(bank, offset) {
	const view = new DataView(bank);
	return view.getUint16(offset);
}