function _lset(string, length) {
	if (typeof string === 'number') {
		string = _roundFloat(string);
	}
	return String(string).padEnd(length);
}