function _int(str) {
	var result = parseInt(str, 10);
	return isNaN(result) ? 0 : result;
}
