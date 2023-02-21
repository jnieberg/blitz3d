function _rand(start = 1, end = 0) {
  if (start >= end) {
    end = start;
    start = 0;
  }
  return Math.floor(_rnd(start, end + 1));
}
