//_drawblockrect(srcImage, targetX, targetY, srcX, srcY, srcWidth, srcHeight, srcFrame, block, targetBuffer);
function _drawblockrect(image, x, y, x2, y2, width, height, frame = 0, block = true, buffer = _graphicsBuffer) {
	if (image && image[frame] && image[frame].context && buffer.context && !buffer.locked) {
		const scaleX = image[frame].scaleX;
		const scaleY = image[frame].scaleY;
		const targetX = x + _originX - image[frame].x;
		const targetY = y + _originY - image[frame].y;
		const translateX = x + width / 2;
		const translateY = y + height / 2;
		if (!_tFormFilterEnabled) {
			buffer.context.imageSmoothingEnabled = false;
			buffer.context.webkitImageSmoothingEnabled = false;
			buffer.context.mozImageSmoothingEnabled = false;
			buffer.context.oImageSmoothingEnabled = false;
			buffer.context.msImageSmoothingEnabled = false;
		}
		buffer.context.save();
		buffer.context.translate(x, y);
		buffer.context.rotate(image[frame].rotate);
		buffer.context.translate(width / 2, height / 2);
		buffer.context.transform(image[frame].transform11, image[frame].transform12, image[frame].transform21, image[frame].transform22, 0, 0);
		buffer.context.translate(-translateX, -translateY);
		buffer.context.scale(scaleX, scaleY);
		if (block) {
			buffer.context.fillStyle = 'rgb(0, 0, 0)';
			buffer.context.fillRect(targetX, targetY, width, height);
		}
		buffer.context.drawImage(image[frame].canvas, x2, y2, width, height, targetX / scaleX, targetY / scaleY, width, height);
		buffer.context.restore();
	}
}