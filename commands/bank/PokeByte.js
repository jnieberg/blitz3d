function _pokebyte(bank, offset, value) {
	const view = new DataView(bank);
	view.setUint8(offset, value);
}