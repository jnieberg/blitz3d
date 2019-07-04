// function _dim() {
// 	return new _ArrayM([...arguments]);
// }

// function _getDim(dim, ...args) {
// 	return dim.position([args]);
// }

// function _setDim(dim, args, val) {
// 	dim.position(args, val)
// 	return dim;
// }

function _dimGetIndex(dimensions, position) {
	let len = 1;
	return position.reduce((total, num, index) => {
		const result = total + len * num;
		len = len * (dimensions[index] + 1);
		return result;
	}, 0);
}

function _dim() {
	const dimensions = [...arguments];
	const width = dimensions.reduce((total, num) => total * (num + 1), 1);
	return {
		dimensions: dimensions,
		array: new Array(width)
	}
}

function _getDim(dim, ...position) {
	return dim.array[_dimGetIndex(dim.dimensions, position)];
}

function _setDim(dim, position, value) {
	dim.array[_dimGetIndex(dim.dimensions, position)] = value;
}