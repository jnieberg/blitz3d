async function _loadimage(filename) {
	return new Promise((resolve, reject) => {
		const id = `loadimage_${filename}`;
		const image = [];
		var img = new Image();
		img.src = filename;
		img.onload = () => {
			const buffer = _graphicsCreate(img.width, img.height, id);
			buffer.context.drawImage(img, 0, 0);
			image.push(buffer);
			_maskimage(image, 0, 0, 0);
			resolve(image);
		};
		img.onerror = () => {
			resolve();
		}
	});
}