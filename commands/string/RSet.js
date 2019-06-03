function _rset(string, length) {
	if (typeof string === 'number') {
		string = Math.round(string * 10000) / 10000;
	}
	return String(string).padStart(length);
}