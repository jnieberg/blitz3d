const _before = (/** @type {any} */ obj) => {
  obj._type._index = obj._type._index > 0 ? obj._type._index - 1 : 0;
  return obj._sub[obj._type._index];
};
