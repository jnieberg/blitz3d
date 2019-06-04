function _bin(integer) {
	return (Array(33).join('0') + (integer >>> 0).toString(2)).slice(-32);
}