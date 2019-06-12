function _tcpstreamip(stream) {
	return stream.name.replace(/:.*?$/, '');
}