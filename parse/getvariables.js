export const getVariables = (/** @type {string} */ bb, /** @type {string} */ all = bb) => {
  let variables = Array.from(bb.matchAll(/(?<!^(?:global|local|const|\.).*?)\b([a-z]\w*?)\b(?==\w)/gim))?.map((v) => v[1]) || [];
  variables = variables.filter((v, i) => {
    const vRx = new RegExp(`(?:\\b(?:global|local|const)\\b).*?\\b${v}\\b`, "gim");
    return variables.indexOf(v) === i && bb.search(vRx) === -1 && all.search(vRx) === -1;
  });
  return variables; //`${variables.map((v) => `global ${v}`).join("\n")}\n${bb}`;
};
