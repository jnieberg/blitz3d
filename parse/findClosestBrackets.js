export const findClosestBrackets = (/** @type {string} */ bb, /** @type {RegExp} */ findRx) => {
  const match = Array.from(bb.matchAll(findRx))[0];
  if (!match || match.index === -1) return null;
  const { index, 0: label } = match;

  let backCount = 0;
  let backIndex = index - 1;
  let fwdCount = 0;
  let fwdIndex = index + 1;
  while (backCount > -1 && backIndex > 0) {
    if (bb.substring(backIndex, backIndex + 1) === "{") backCount--;
    if (bb.substring(backIndex, backIndex + 1) === "}") backCount++;
    backIndex--;
  }
  while (fwdCount > -1 && fwdIndex < bb.length - 1) {
    if (bb.substring(fwdIndex, fwdIndex + 1) === "}") fwdCount--;
    if (bb.substring(fwdIndex, fwdIndex + 1) === "{") fwdCount++;
    fwdIndex++;
  }
  backIndex = backIndex <= 0 ? 0 : backIndex + 2;
  fwdIndex = fwdIndex >= bb.length ? bb.length - 1 : fwdIndex;
  return [
    bb.substring(0, backIndex),
    bb.substring(backIndex, index),
    label,
    bb.substring(index + label.length, fwdIndex),
    bb.substring(fwdIndex, bb.length),
  ];
};
