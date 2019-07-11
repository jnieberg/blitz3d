var _seedRndSeed = 0;
function _seedrnd(seed) {
	_seedRndSeed = seed;
	return function () {
		seed = Math.sin(seed) * 1000000 - Math.floor(seed);
		seed = seed - Math.floor(seed);
		_seedRndSeed = seed;
		return seed
	};
};
_seedrnd(0);
