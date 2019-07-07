function _currentdate() {
	const date = new Date();
	const day = `0${date.getDate()}`.slice(-2);
	const month = date.toLocaleString('en-us', { month: 'short' });
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
}