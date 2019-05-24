function rnd(start, end, float) {
	if (typeof start === 'undefined') {
		start = 0;
		end = 1;
	}
	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	const result = _seedRndRandomFn() * (end + 1) + start;
	if (float) {
		return result;
	}
	return Math.floor(result);
}
