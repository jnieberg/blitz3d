const _first = (/** @type {any} */ obj) => {
  obj._type._index = 0;
  return obj._sub[obj._type._index];
};
