function _flushmouse() {
	clearInterval(_waitMouseInterval);
	_waitMouseInterval = undefined;
	_waitMouseEvent = undefined;
	_mouseHitTimes = [];
	_mouseDownThis = 0;
	_mouseDownCheck = 0;
}