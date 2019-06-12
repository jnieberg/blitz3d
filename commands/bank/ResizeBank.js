function _resizebank(bank, size = 0) {
	bank.data = bank.data.substring(0, bank.data.length) + Array(bank.data.length + 1).join(_chr(0));
	return bank;
}