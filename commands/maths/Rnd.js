function _rnd(startP = 0.0, endP = 1.0) {
	let start = startP;
	let end = endP;
	if (startP instanceof Float) {
		start = startP.value;
	}
	if (endP instanceof Float) {
		end = endP.value;
	} else {
		end = end + 1;
	}
	if (start > end) {
		end = start;
		start = 0.0;
	}
	const result = _seedrnd(_seedRndSeed + 1)() * end + start;
	if (startP instanceof Float && endP instanceof Float) {
		return new Float(result);
	}
	return Math.floor(result);
}
