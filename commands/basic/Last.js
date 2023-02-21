const _last = (/** @type {any} */ obj) => {
  obj._type._index = obj._sub.length - 1;
  return obj._sub[obj._type._index];
};
