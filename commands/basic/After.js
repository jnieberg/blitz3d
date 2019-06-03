function _after(obj) {
	if (obj._index >= window['_var_' + obj._class.name].length - 1) {
		return {
			'_class': obj._class,
			'_index': window['_var_' + obj._class.name].length
		}
	}
	return window['_var_' + obj._class.name][obj._index + 1];
}
