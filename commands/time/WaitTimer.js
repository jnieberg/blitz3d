function _waittimer(timer) {
	while (_millisecs() - timer.millisecs < 1000 / timer.frequency) { }
	timer.millisecs = _millisecs();
}