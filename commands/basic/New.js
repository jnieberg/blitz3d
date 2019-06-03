function _new(Cls) {
	if (!window['_var_' + Cls.name]) {
		window['_var_' + Cls.name] = [];
	}
	window['_var_' + Cls.name].push(new Cls());
	const obj = window['_var_' + Cls.name];
	const result = obj[obj.length - 1];
	result._class = Cls;
	result._index = obj.length - 1;
	return result;
}
