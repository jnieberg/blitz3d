const _after = (/** @type {any} */ obj) => {
  obj._type._index = obj._type._index < obj._sub.length - 1 ? obj._type._index + 1 : obj._sub.length;
  return obj._sub[obj._type._index];
};
