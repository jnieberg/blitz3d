function _opentcpstream(ip, port) {
	return {
		name: `${ip.trim()}:${port}`,
		stream: '',
		data: '',
		readonly: false,
		position: 0
	};
}