function _debuglog(text, color = '#fff') {
	const debug = document.querySelector('.debug code');
	debug.innerHTML += `<span style="color:${color};">${text}\n`;
	document.querySelector('.debug').scrollTo(0, document.querySelector('.debug').scrollHeight);
}