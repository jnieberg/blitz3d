async function _saveimage(image, filename, frame = 0) {
	return await _savebuffer(image[frame], filename);
}