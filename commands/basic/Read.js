var _readIndex = 0;
function _read(variable) {
	let result;
	do {
		result = _dataList[_readIndex++];
	} while (typeof result === 'string' && result.indexOf('__') === 0);
	return result;
}