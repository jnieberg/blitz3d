export const findOpenBracket = (/** @type {string} */ text, /** @type {number} */ closePos) => {
  let openPos = closePos - 1;
  let counter = 1;
  let rowFound = false;
  while (!rowFound && openPos >= 0) {
    const c = text.substring(--openPos, openPos + 1);
    if (c === "}") {
      counter++;
    } else if (c === "{") {
      counter--;
    }
    if (counter === 0 && c === "\n") rowFound = true;
  }
  return openPos;
};
