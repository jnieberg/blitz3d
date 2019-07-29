var _flipSync = true;
function _flip() {
	if (_flipSync) {
		_flipSync = false;
		const back = _backbuffer();
		const front = _frontbuffer();
		front.context.drawImage(back.canvas, 0, 0);
	}
}