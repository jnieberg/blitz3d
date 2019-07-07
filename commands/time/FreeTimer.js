function _freetimer(timer) {
	delete timer;
	timer = undefined;
	return timer;
}