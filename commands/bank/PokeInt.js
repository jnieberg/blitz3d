function _pokeint(bank, offset, value) {
	const view = new DataView(bank);
	view.setInt32(offset, value);
}