function _opentcpstream(ip, port) {
	return {
		name: `${ip}:${port}`,
		data: '',
		readonly: false,
		position: 0
	};
}