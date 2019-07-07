function _copyimage(image) {
	const result = [];
	for (let i = 0, _length = image.length; i < _length; i++) {
		const buffer = Object.assign({}, image[i]);
		buffer.id += '_copy';
		result.push(buffer);
	}
	return result;
}