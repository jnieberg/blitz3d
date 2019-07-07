function _createtimer(frequency) {
	return {
		frequency: frequency,
		millisecs: _millisecs()
	}
}