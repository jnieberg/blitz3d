function _int(str) {
	var result = typeof str === 'string' ?
		parseInt(str, 10) :
		Math.floor(str);
	return isNaN(result) ? 0 : result;
}
