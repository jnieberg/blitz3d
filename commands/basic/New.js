function _new(klass) {
  const self = klass;
  //   klass._index += 1;
  klass._sub.push({
    ...klass._obj,
    get _sub() {
      return self._sub;
    },
    get _type() {
      return self;
    },
    get _index() {
      return klass._sub.indexOf(this);
    },
  });
  return klass._sub[klass._sub.length - 1];
}
