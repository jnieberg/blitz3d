function _rand(start = 1, end = 1) {
	if (start > end) {
		end = start;
		start = 1;
	}
	return _rnd(start, end);
}
