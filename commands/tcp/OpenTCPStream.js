function _opentcpstream(ip, port) {
	return {
		name: `${ip.trim()}:${port.trim()}`,
		data: '',
		readonly: false,
		position: 0
	};
}