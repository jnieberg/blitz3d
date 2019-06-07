function _hex(integer, length = 8) {
	const signAdd = integer < 0 ? 4294967296 : 0;
	return (Array(length + 1).join('0') + Number(integer + signAdd).toString(16)).slice(-length).toUpperCase();
}