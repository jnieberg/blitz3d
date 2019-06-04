function _rnd_f(start = 0.0, end = 1.0) {
	if (start > end) {
		end = start;
		start = 0.0;
	}
	return new Float(_seedrnd(_seedRndSeed + 1)() * end + start);
}
