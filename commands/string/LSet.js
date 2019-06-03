function _lset(string, length) {
	if (typeof string === 'number') {
		string = Math.round(string * 10000) / 10000;
	}
	return String(string).padEnd(length);
}