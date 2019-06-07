function _rnd(start = 0, end = 1) {
	return Math.floor(_rnd_f(start, end + 1).value);
}
