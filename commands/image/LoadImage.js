async function _loadimage(filename) {
	return new Promise((resolve, reject) => {
		const id = `loadimage_${filename}`;
		const buffers = [];
		var img = new Image();
		img.src = filename;
		img.onload = () => {
			const buffer = _graphicsCreate(img.width, img.height, id);
			buffer.context.drawImage(img, 0, 0);
			buffers.push(buffer);
			resolve(buffers);
		};
		img.onerror = () => {
			resolve();
		}
	});
}