function _pokeshort(bank, offset, value) {
	const view = new DataView(bank);
	view.setUint16(offset, value);
}