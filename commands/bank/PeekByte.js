function _peekbyte(bank, offset) {
	const view = new DataView(bank);
	return view.getUint8(offset);
}