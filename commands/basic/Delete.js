const _delete = (/** @type {any} */ obj) => {
  obj._sub.splice(obj._index, 1);
  return null;
};
