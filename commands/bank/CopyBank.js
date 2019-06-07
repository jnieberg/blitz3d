function _copybank(bankFrom, offsetFrom, bankTo, offsetTo, size) {
	new Uint8Array(bankTo, offsetTo).set(new Uint8Array(bankFrom, offsetFrom, size));
}