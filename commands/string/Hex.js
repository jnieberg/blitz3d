function _hex(integer) {
	return (Array(9).join('0') + Number(integer).toString(16)).slice(-8).toUpperCase();
}