const reservedWords = [
  "await",
  "after",
  "and",
  "before",
  "case",
  "const",
  "data",
  "default",
  "delete",
  "dim",
  "each",
  "else",
  "elseif",
  "end",
  "endif",
  "exit",
  "false",
  "field",
  "first",
  "float",
  "for",
  "forever",
  "function",
  "global",
  "gosub",
  "goto",
  "if",
  "insert",
  "int",
  "last",
  "local",
  "mod",
  "new",
  "next",
  "not",
  "null",
  "or",
  "pi",
  "read",
  "repeat",
  "restore",
  "return",
  "sar",
  "select",
  "shl",
  "shr",
  "step",
  "str",
  "then",
  "to",
  "true",
  "type",
  "until",
  "wend",
  "while",
  "xor",
  "include",
  "endselect",
  "endtype",
  "endfunction",
];

export const isAvailableWord = (/** @type {string} */ word) => reservedWords.indexOf(word.toLowerCase()) == -1;

export const getVariables = (/** @type {string} */ bb, /** @type {string} */ all = bb) => {
  let vartype = Array.from(bb.matchAll(/(?<!^(?:global|local|const|\\).*?)\b([a-z]\w*?)\b/gim))?.map((v) => [v[1], v[2]]) || [];
  /**
   * @type {string[]}
   */
  let variables = [];
  /**
   * @type {string[]}
   */
  const types = [];
  vartype.forEach(([v, t]) => {
    variables.push(v);
    types.push(t);
  });
  variables = variables.filter((v, i) => {
    if (!isAvailableWord(v)) return false;
    const vRx = new RegExp(`(?:\\b(?:global|local|const|\\\\)\\b).*?\\b${v}(_${types[i] || ""})?\\b`, "gim");
    return variables.indexOf(v) === i && bb.search(vRx) === -1 && all.search(vRx) === -1;
  });
  return variables; //`${variables.map((v) => `global ${v}`).join("\n")}\n${bb}`;
};
