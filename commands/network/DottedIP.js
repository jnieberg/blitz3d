function _dottedip(index) {
	return ((index >>> 24) + '.' + (index >> 16 & 255) + '.' + (index >> 8 & 255) + '.' + (index & 255));
}