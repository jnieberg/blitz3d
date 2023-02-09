export const getGlobal = (/** @type {string} */ bb) => {
  return bb.replace(/\bfunction\b([\w\W]*?)\bendfunction\b/gi, "");
};
