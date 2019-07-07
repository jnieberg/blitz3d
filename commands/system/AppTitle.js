var _appTitlePrompt = undefined;

function _apptitle(title, prompt) {
	document.title = title;
	if (prompt) {
		_appTitlePrompt = prompt;
		window.onbeforeunload = (event) => {
			event = event || window.event;
			if (event) {
				event.returnValue = _appTitlePrompt;
			}
			return _appTitlePrompt;
		};
	}
}