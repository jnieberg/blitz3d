const _insert = (/** @type {any} */ obj, /** @type {any} */ at) => {
  const objIndex = obj._index;
  const atIndex = at._index;
  obj._sub.splice(objIndex, 1);
  obj._sub.splice(atIndex, 0, obj);
  return 0;
};
