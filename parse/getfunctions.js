export const getFunctions = (/** @type {string} */ bb) => {
  return Array.from(bb.matchAll(/(\bfunction\b.*?)\n([\w\W]*?)\n(\bendfunction\b)/gi)).map((fn) => [fn[1], fn[2], fn[3]]);
};
