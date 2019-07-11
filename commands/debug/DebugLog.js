var _debugLogCount = 0;
function _debuglog(text, color = '#fff') {
	const debug = document.querySelector('.debug code');
	debug.innerHTML += `<span style="color:${color};" id="debug-log-${_debugLogCount}"></span>\n`;
	((txt, i) => {
		setTimeout(() => {
			const debugSpan = document.querySelector(`.debug code span#debug-log-${i}`);
			if (debugSpan) {
				debugSpan.innerHTML += txt;
			}
			document.querySelector('.debug').scrollTo(0, document.querySelector('.debug').scrollHeight);
		}, 100);
	})(text, _debugLogCount);
	_debugLogCount += 1;
}

function _errorlog(err, log = false) {
	if (log) {
		console.error(err);
	}
	try {
		const error = err.stack.replace(/[\r\n\t\s]+/gm, ' ');
		const message = error.replace(/ *(\(|at +)?http:\/\/.*$/gm, '');
		const file = error.replace(/^.* +at +https?:\/\/.*\/(.*?)\.js:.*$/gm, '$1').toUpperCase();
		const line = error.replace(/^.* +at +https?:\/\/.*\/.*?\.js:(.*?):.*$/gm, '$1');
		_debuglog(`[${file}] - ${message} (line ${line})`, '#f57');
	} catch (e) { }
}