function _createbank(size = 0) {
	return {
		name: 'bank',
		data: Array(size + 1).join(_chr(0)),
		position: 0,
		readonly: false
	}
}