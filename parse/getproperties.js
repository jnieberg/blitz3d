export const getProperties = (/** @type {string} */ fn) => {
  const propList = fn.replace(/\bfunction +_[a-z]\w*?\b\((.*?)\)/gi, "$1");
  const props = propList.split(/,/g).map((prop) => {
    return prop.replace(/^([a-z]\w*?\b[$%#]?).*?$/i, "$1");
  });
  return props;
};
