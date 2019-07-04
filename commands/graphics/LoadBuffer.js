async function _loadbuffer(buffer, filename) {
	return new Promise((resolve, reject) => {
		if (_bufferEditable()) {
			var img1 = new Image();
			img1.src = filename;
			img1.onload = () => {
				resolve(buffer.context.drawImage(img1, 0, 0, buffer.canvas.width, buffer.canvas.height));
			};
			img1.onerror = () => {
				resolve();
			}
		} else {
			resolve();
		}
	});
}