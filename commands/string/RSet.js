function _rset(string, length) {
	if (typeof string === 'number') {
		string = _roundFloat(string);
	}
	return String(string).padStart(length);
}