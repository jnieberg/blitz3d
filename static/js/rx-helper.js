/**
 * Helper object for Regular Expressions. Can be used to map an easy-to-understand explanation into a regular expression part
 * @typedef RegExplainedType
 * @type {object}
 * @property {string} explanation - Explanation of this regular expression part
 * @property {string} rxString - The Regular Expression as a string
 * @property {boolean} match - Set to true if this part needs to be matched
 * @property {boolean} group - Set group of a new Regular Explanation
 */

const RX = {
  anything: ".*?",
  text: "\\b\\w+?\\b",
  variable: "\\b[_a-zA-Z]\\w*?\\b",
  bracketed: "\\((?:[^)(]|\\((?:[^)(]|\\((?:[^)(]|\\([^)(]*\\))*\\))*\\))*\\)",
};

class RegExplained {
  /** @param {RegExplainedType} step */
  constructor(step) {}
}

class ToRegExp {
  /** @param {RegExplainedType[]} steps */
  constructor(steps) {}
}
