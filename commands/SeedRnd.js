var _seedRndRandomFn;
function _seedrnd(num) {
	function xmur3(number) {
		var str = String(number);
		for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
			h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
				h = h << 13 | h >>> 19;
		}
		return function () {
			h = Math.imul(h ^ h >>> 16, 2246822507);
			h = Math.imul(h ^ h >>> 13, 3266489909);
			return (h = h ^ h >>> 16) >>> 0;
		};
	}
	function mulberry32(a) {
		return function () {
			var t = a = a + 0x6D2B79F5;
			t = Math.imul(t ^ t >>> 15, t | 1);
			t = t ^ t + Math.imul(t ^ t >>> 7, t | 61);
			return ((t ^ t >>> 14) >>> 0) / 4294967296;
		};
	}
	var seed = xmur3(num);
	_seedRndRandomFn = mulberry32(seed());
}
_seedrnd(0);
