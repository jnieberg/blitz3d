function _insert(obj, ins) {
	const Cls = obj._class;
	const from = obj._index;
	const to = ins._index + 1;
	if (!_each(Cls)) {
		window['_var_' + Cls.name] = [];
	}
	window['_var_' + Cls.name].splice(to, 0, _each(Cls).splice(from, 1)[0]);
	_refreshClass(Cls);
}
