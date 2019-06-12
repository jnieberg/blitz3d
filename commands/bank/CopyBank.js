function _copybank(bankFrom, offsetFrom, bankTo, offsetTo, size) {
	const string = bankFrom.data.substring(offsetFrom, offsetFrom + size);
	bankTo.data = bankTo.data.substr(0, offsetTo) + string + bankTo.data.substr(offsetTo + string.length);
}