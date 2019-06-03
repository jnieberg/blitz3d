function _rnd(start, end, float) {
	if (typeof start === 'undefined') {
		start = 0.0;
		end = 1.0;
	}
	if (typeof end === 'undefined') {
		end = start;
		start = 0.0;
	}
	let result = Math.floor(_seedrnd(_seedRndSeed + 1)() * (end + 1) + start);
	if (float) {
		result = _seedrnd(_seedRndSeed + 1)() * end + start;;
	}
	return result;
}
