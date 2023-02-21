function _rndseed() {
  var seed = cyrb128(`${_seedRndNumber}`);
  _seedRndFn = sfc32(seed[0], seed[1], seed[2], seed[3]);
  return _seedRndNumber;
}
