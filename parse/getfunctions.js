export const getFunctions = (/** @type {string} */ bb) => {
  return Array.from(bb.matchAll(/\bfunction\b([\w\W]*?)\bendfunction\b/gi)).map((fn) => fn[0]);
};
