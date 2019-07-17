function _not(cond) {
	if (cond instanceof _Obj) {
		return !cond.valueOf();
	}
	return !cond;
}