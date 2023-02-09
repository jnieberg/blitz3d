const _dim = (/** @type {number[]} */ ...dimensions) => {
  const /** @type {function} */ newArray = (/** @type {string | any[]} */ dimensions, /** @type {any[]} */ array = []) => {
      let arr;
      let rest;
      if (dimensions.length > 0) {
        const len = dimensions[0];
        rest = dimensions.slice(1);
        arr = [];
        for (let d = 0; d <= len; d++) {
          arr[d] = newArray(rest, array);
        }
      } else {
        arr = 0;
      }
      return arr;
    };

  const getArray = (array, indices) => {
    var returnValue = 0;
    if (indices.length === 0) {
      returnValue = array;
    } else {
      const index = Math.floor(indices[0].valueOf());
      if (array[index]) {
        returnValue = getArray(array[index], indices.slice(1));
      }
    }
    return returnValue;
  };
  return newArray(dimensions);

  //   return function () {
  //     return {
  //   /** @type {number[]} */ array: newArray(dimensions),
  //   set(/** @type {any} */ value, /** @type {number[]} */ ...location) {
  //     return this.array;
  //   },
  // get: function (/** @type {number[]} */ ...arguments) {
  //   const position = [...arguments];
  //   let result = getArray(this.array, position);
  //   return isNaN(result) ? result : Number(result);
  // },
  //     };
  //   };
};
