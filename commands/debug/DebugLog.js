var _debugLogCount = 0;
function _debuglog(text, color = '#fff') {
	const debug = document.querySelector('.debug code');
	debug.innerHTML += `<span style="color:${color};" id="debug-log-${_debugLogCount}"></span>\n`;
	((txt, i) => {
		setTimeout(() => {
			const debugSpan = document.querySelector(`.debug code span#debug-log-${i}`);
			debugSpan.innerHTML += txt;
			document.querySelector('.debug').scrollTo(0, document.querySelector('.debug').scrollHeight);
		}, 100);
	})(text, _debugLogCount);
	_debugLogCount += 1;
}