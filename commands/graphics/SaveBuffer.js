async function _savebuffer(buffer, filename) {
	if (buffer.context) {
		return await _postCommand('savebuffer', {
			filename: filename,
			data: buffer.canvas.toDataURL('image/png')
		});
	} else {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}
