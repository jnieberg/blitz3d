function _runtimeerror(text, color = '#f57') {
	_debuglog(text, color);
	throw new Error();
}