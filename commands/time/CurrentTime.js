function _currenttime() {
	const date = new Date();
	const hour = `0${date.getHours()}`.slice(-2);
	const minute = `0${date.getMinutes()}`.slice(-2);
	const second = `0${date.getSeconds()}`.slice(-2);
	return `${hour}:${minute}:${second}`;
}