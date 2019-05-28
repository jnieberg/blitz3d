function _before(obj) {
	if (obj._index <= 0) {
		return {
			'_class': obj._class,
			'_index': -1
		}
	}
	return window['_var_' + obj._class.name][obj._index - 1];
}
