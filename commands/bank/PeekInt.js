function _peekint(bank, offset) {
	const view = new DataView(bank);
	return view.getInt32(offset);
}