function _delete(obj) {
	const Cls = obj._class;
	const index = obj._index;
	if (!_each(Cls)) {
		window['_var_' + Cls.name] = [];
	}
	window['_var_' + Cls.name].splice(index, 1);
	_refreshClass(Cls);
}
