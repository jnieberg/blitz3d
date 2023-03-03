import beautify from "beautify";
import { systemCommands } from "../commands.js";
import { getFunctions } from "./getfunctions.js";
import { getVariables, isAvailableWord } from "./getvariables.js";
import { getGlobal } from "./getglobal.js";
import { getProperties } from "./getproperties.js";
import { readFileSync } from "fs";
import { findClosestBrackets } from "./findClosestBrackets.js";

const stringReplacer = "___";
const stringReplacerRx = /___(\d+)___/;
/**
 * @type {string[]}
 */
let stringListBackup = [];
let stringListBackupCounter = 0;

const parseIncludes = (/** @type {string} */ bb) => {
  bb = bb.replace(/^ *include *" *(.*?) *" *$/gim, (m, m1) => {
    m1 = m1.replace(/\\/g, "/");
    let include = "";
    try {
      include = readFileSync(m1).toString();
    } catch (err) {}
    return parseIncludes(include);
  });
  return bb;
};

const clearComments = (/** @type {string} */ bb) => bb.replace(/;.*?$/gm, "");

const captureStrings = (/** @type {string} */ bb) => {
  stringListBackup = Array.from(bb.match(/"(.*?)"/g) || []);
  stringListBackupCounter = 0;
  while (bb.match(/"(.*?)"/)) bb = bb.replace(/"(.*?)"/, ` ${stringReplacer}${stringListBackupCounter++}${stringReplacer} `);
  return bb;
};

const restoreStrings = (/** @type {string} */ bb) => {
  while (bb.match(stringReplacerRx)) bb = bb.replace(stringReplacerRx, (m, m1) => stringListBackup[m1].replace(/\\/g, "\\\\"));
  return bb;
};

const cleanup = (/** @type {string} */ bb) => {
  bb = bb
    .toLowerCase()
    .replace(/[ \t]+/gm, " ")
    .replace(/^ +| +$/gm, "")
    .replace(/ *([()<>,=+\-*/:^]) */g, "$1")
    .replace(/ *\) *(?=\w)/g, ") ")
    .replace(/\r/g, "")
    .replace(/ *\n+ */g, "\n")
    .replace(/^([\w\W]*?)$/, "\n$1\n")
    .replace(/(?<=\bfunction\b.*?\n)([\w\W]*?)(?=\bend function\b)/gim, "\n$1\n")
    .replace(/ *\bNot\b */gim, "!")
    .replace(/\bElse +If\b/gi, "ElseIf")
    .replace(
      /\b(If|ElseIf)\b *([^\s]+?(?: +(?:And|Or|Xor|Mod|Shl|Shr|Sar) +[^\s]+?)*) +((?!(?:Then|And|Or|Xor|Mod|Shl|Shr|Sar)\b).+?)$/gim,
      "$1 $2 Then $3"
    );
  while (bb.match(/\bIf\b *(.+?) *\bThen\b /im)) bb = bb.replace(/\bIf\b *(.+?) *\bThen\b *(.+?) *$/gim, "If $1\n$2\nEndIf");
  while (bb.match(/\bElseIf\b *(.+?) *\bThen\b /im)) bb = bb.replace(/\bElseIf\b *(.+?) *\bThen\b *(.+?) *$/gim, "\nElseIf $1\n$2");

  bb = bb
    .replace(/^(.+?) *\bElse\b *(.+?) *$/gim, "$1\nElse\n$2")
    .replace(/\bEnd +(If|Function|Select|Type)\b/gim, "End$1")
    .replace(/ *:+ */g, "\n")
    .replace(/(^\.[a-z]\w*?) (.+?$)/gim, "$1\n$2")
    .replace(/\bThen\b */gi, "\n")

    .replace(/\b([a-z]\w*?)\b(?==___)/gim, "$1$")

    .replace(/\b([a-z]\w*?)\.([a-z]\w*?)\b/gim, "$1")
    .replace(/\b([a-z]\w*?.*?)\\([a-z]\w*?)\b/gim, "$1.$2")
    .replace(/^Read (.*?)$/gim, "$1=Read $1");

  return bb;
};

const parseTypes = (/** @type {string} */ bb) => {
  const variables = Array.from(new Set(bb.match(/(\b[a-z]\w*?\b)[$#%]/gi)));
  variables.forEach((variable) => {
    const v = variable.slice(0, -1);
    const t = variable.slice(-1);
    const varRx = new RegExp(`(\\b${v}\\b[$#%]?)(?![$#%])`, "gim");
    if (t === "#") bb = bb.replace(varRx, `${v}_f`);
    else if (t === "$") bb = bb.replace(varRx, `${v}_s`);
    else if (t === "%") bb = bb.replace(varRx, `${v}_i`);
  });
  bb = bb.replace(/\b([a-z]\w*?)\b[$#%]/gi, "$1");
  return bb;
};

const findCommands = (/** @type {string} */ bb) => {
  const customFunctions = Array.from(bb.matchAll(/^function ([a-z]\w*?)\b/gim))?.map((m) => m[1]) || [];
  /** @type {string[]} */
  const commands = Object.keys(systemCommands)
    .concat(customFunctions)
    .sort((a, b) => (a < b ? 1 : -1));
  commands.forEach((systemCommandName) => {
    const fnRx = new RegExp(`\\b${systemCommandName}(_[sfi])?\\b`, "gim"); //functions and their calls
    const cmdRx = new RegExp(`(?<!function )\\b_${systemCommandName}(_[sfi])?\\b`, "gim"); // calls only
    const async = systemCommands[systemCommandName] ? systemCommands[systemCommandName].async : true;
    bb = bb.replace(fnRx, `_${systemCommandName.toLowerCase()}`);
    bb = bb.replace(cmdRx, `${async ? "await " : ""}_${systemCommandName.toLowerCase()}`);
    // }
  });
  bb = bb.replace(/(?<=\W )(\b_[a-z]\w*?\b)/gi, "\n$1");
  //(?<!\()
  while (bb.match(/\b(_[a-z]\w*?\b)(?:([ +-.].*?$)|$)/gim))
    bb = bb.replace(/\b(_[a-z]\w*?\b)(?:([ +-.].*?$)|$)/gim, (m, m1 = "", m2 = "") => {
      return `${m1.trim()}(${m2.trim()})`;
    });
  return { bb, commands };
};

const setGlobalVariables = (/** @type {string} */ bb) => {
  const variables = getVariables(getGlobal(bb));
  return `${variables.map((v) => `global ${v}`).join("\n")}\n${bb}`;
};

const setFunctionVariables = (/** @type {string} */ bb) => {
  const functions = getFunctions(bb);
  return `${getGlobal(bb)}
${functions
  .map((fn) => {
    const variables = getVariables(fn[1], getGlobal(bb)).filter((variable) => getProperties(fn[0]).indexOf(variable) === -1);
    return `${fn[0]}
${variables.map((v) => `global ${v}`).join("\n")}
${fn[1]}
${fn[2]}`;
  })
  .join("\n")}`;
};

const parseDims = (/** @type {string} */ bb) => {
  // change dim command into a _dim() function
  bb = bb.replace(
    /\b_dim\(([_a-z]\w*?)\((?<=\()([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*)(?=\))\)\)/gim,
    "global $1=_dim($2)"
  );
  // search DIM
  const dims = Array.from(bb.matchAll(/(\b[a-z]\w*?)=_dim\(/gim));
  dims.map((d) => {
    const variable = d[1];
    // const dimensions = d[2];
    const dimRx = new RegExp(
      `(?<!_dim\\()\\b(${variable})\\((?<=\\()([^)(]*(?:\\([^)(]*(?:\\([^)(]*(?:\\([^)(]*\\)[^)(]*)*\\)[^)(]*)*\\)[^)(]*)*)(?=\\))\\)`,
      "gim"
    );
    bb = bb.replace(dimRx, (m, m1, m2) => {
      return `${m1}[Math.trunc(${m2.replace(/,(?![^()]*(?:\([^()]*\))?\))/g, ")][Math.trunc(")})]`;
    });
  });
  return bb;
};

const setGoto = (/** @type {string} */ bb, /** @type {string} */ label, /** @type {boolean} */ isStart = false) => {
  const gotoRx = new RegExp(`\\bgoto (${label})\\b`, "gi");
  if (isStart) bb = bb.replace(gotoRx, "break _$1");
  else bb = bb.replace(gotoRx, "continue _$1");
  return bb;
};

const setLabels = (/** @type {string} */ bb) => {
  const bbRx = /^\.[a-z]\w*?$/gim;
  let found;
  while ((found = findClosestBrackets(bb, bbRx))) {
    const label = found[2].substring(1);
    bb = `${found[0]}
_${label}: {${setGoto(found[1], label, true)}}
_${label}: while(await _async()) {${setGoto(found[3], label)}break
}
${found[4]}`;
  }

  return bb;
};

// data blocks
const setData = (/** @type {string} */ bb) => {
  bb = bb
    .replace(/^\.([a-z]\w*?)((?:\n_data\(.*?\))+)/gim, '_data("$1",$2)')
    .replace(/,?\n_data\((.*?)\)/gi, ",$1")
    .replace(/^_restore\((.*?)\)$/gim, '_restore("$1")')
    .replace(/^([\w\W]*?)((?:\n_data\(.*?\))+)/gi, "$2\n$1");
  return bb;
};

const parseStatements = (/** @type {string} */ bb) => {
  bb = bb
    // single operators
    .replace(/%([01]+)/gm, "parseInt('$1',2)-4294967296")
    .replace(/\$([A-F0-9]+)/gim, "(0x$1 shr 0x100)")
    .replace(/\btrue\b/gim, "1")
    .replace(/\bfalse\b/gim, "0")
    .replace(/\band\b/gim, "&")
    .replace(/\bor\b/gim, "|")
    .replace(/\^/gim, "**")
    .replace(/\bmod\b/gim, "%")
    .replace(/ *\bmod\b */gim, "%")
    .replace(/ *\bxor\b */gim, "^")
    .replace(/ *\bshl\b */gim, "<<")
    .replace(/ *\bshr\b */gim, ">>")
    .replace(/ *\bsar\b */gim, ">>>")

    // for conditional expressions, change single = & | into doubles == && ||, and <> into != (not).
    .replace(/(?<=(?:^(?:if|elseif|while|until|return|case)\b|^[a-z]\w*?=).*?)(?<![=&|<>!])([=&|])(?![=&|<>])/gim, "$1$1")
    .replace(/(?<=(?:^(?:if|elseif|while|until|return|case)\b|^[a-z]\w*?=).*?)<>/gim, "!=")

    // add brackets to functions and make them async
    .replace(/^function\b *(_\w*?)\((.*?)\)$/gim, "async function $1($2) {")

    // change type and field combination into a new Set
    .replace(/^type\b *(.+?)$/gim, "var $1=new _Type({")
    .replace(/^field\b *(.+?)$/gim, (m, m1) => `${m1.replace(/,/gim, ",\n")},`)
    .replace(/^endtype$/gim, "})")

    // bracketize if and else conditions
    .replace(/^if\b *(.+?)$/gim, "if($1) {")
    .replace(/^else\b$/gim, "} else {")
    .replace(/\belseif\b *(.+?)$/gim, "} else if($1) {")

    // while, repeat, until, forever and exit statements
    .replace(/^while\b *(.+?)$/gim, "while(await _async()&&($1)) {")
    .replace(/^repeat$/gim, "do {")
    .replace(/^until\b *(.+?)$/gim, "} while(await _async()&&!($1))")
    .replace(/^forever$/gim, "} while(await _async())")
    .replace(/^exit$/gim, "break")

    // change "select" to "switch" statement, with their mandatory "break"
    .replace(/^select\b *(.+?)$/gim, "switch($1) {")
    .replace(/\bcase\b *(.+?)\n([\w\W]*?)(?=\b(?:case|default|endselect)\b)/gi, "case $1:\n$2break\n")
    .replace(/^default$/gim, "default:")
    .replace(/^endselect$/gim, "}")

    // split combined global and local variables, and change them respecively into "var" and "let"
    .replace(/^global\b/gim, "var")
    .replace(/^local\b/gim, "let")

    // change various BB "for" statements into javascript "for"
    .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)(?: *\bstep\b *(.+?))$/gim, "for($1=$2;$1!=$3+$4;$1=$1+$4) {")
    .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)$/gim, "for($1=$2;$1<=$3;$1+=1) {")

    //for room.chair=each chair
    .replace(/^for ([_a-z]\w*?)=(.+?)$/gim, "for($1 of $2) {")

    // closing statements
    .replace(/^(endif|wend|next|endfunction)$/gim, "}")

    // commands with identical name that need to be lower-cased
    .replace(/\b(return|const)\b/gim, (/** @type {string} */ match) => match.toLowerCase())

    // some exception commands should get a return variable
    .replace(/\b_(delete|insert)\b\(([a-z]\w*?\b)/gim, "$2=_$1($2,");

  return bb;
};

const fixSyntax = (/** @type {string} */ bb) => {
  return bb.replace(/\b(switch(.*?) {)\nbreak/gi, "$1").replace(/(?<=^_print\(.*?___)\+(?=.*?\))|(?<=^_print\(.*?)\+(?=___.*?\))/gim, ",");
};

const applySemicolons = (/** @type {string} */ bb) => {
  return bb.replace(/([^{}:,\n])$/gim, "$1;");
};

const parseVariables = (/** @type {string} */ bb) => {
  const variables = Array.from(new Set(bb.match(/(?<=^(?:global|local|const) .*?)([a-z]\w*?\b)/gim) || []))
    .filter((v) => isAvailableWord(v))
    .filter((v) => !bb.match(new RegExp(`\\.${v}\\b`)));
  variables.forEach((v) => {
    const vRx = new RegExp(`\\b(${v})\\b`, "gim");
    const tRx = new RegExp(
      `(?<!^(?:function|global|local|const|type|goto|gosub) .*?|\\.|.*?"|^)(\\b${v}\\b)(?![([]|\\.[a-z]\\w*?\\b|\\+?=|:)`,
      "gim"
    );
    const type = v.replace(/^[a-z].*?(?:_([sfi]))?$/gi, "$1");
    if (type === "s") bb = bb.replace(tRx, "_tostring($1)");
    else if (type === "f") bb = bb.replace(tRx, "_tofloat($1)");
    else if (type === "b") bb = bb.replace(tRx, "_toint($1)");
    else bb = bb.replace(tRx, "_toint($1)");
    bb = bb.replace(vRx, "_$1");
  });
  bb = bb.replace(/\b(\w+?)(_[sfi])?\b/gi, "$1");
  return bb;
};

const initializeJS = (/** @type {string} */ bb) => {
  return `(async () => {
  try {
    _endgraphics();
    _readdir();
    await _loadfont("courier", 18, 0, 0, 0);
    ${bb}
    _end();
  } catch(error) {
    if(error && error.message) _errorlog(error.stack, true);
  }
})();`;
};

const compactCode = (/** @type {string} */ bb) =>
  bb
    .replace(/\n+/g, "")
    .replace(/[ \t]+(?=\W)/g, "")
    .replace(/(?<=\W)[ \t]+/g, "")
    .trim();

/**
 * @param {Object} parsedata
 * @param {string} parsedata.bb
 * @param {string} [parsedata.folder]
 * @param {boolean} [parsedata.compact]
 * @returns {string}
 */
export const parseBB = ({ bb, compact = false }) => {
  bb = parseIncludes(bb);
  bb = captureStrings(bb);
  bb = clearComments(bb);
  bb = cleanup(bb);
  bb = parseTypes(bb);
  ({ bb } = findCommands(bb));
  bb = setData(bb);
  bb = setFunctionVariables(bb);
  bb = setGlobalVariables(bb);
  bb = parseDims(bb);
  bb = parseVariables(bb);
  bb = parseStatements(bb);
  bb = setLabels(bb);

  bb = fixSyntax(bb);
  bb = applySemicolons(bb);

  if (compact) bb = compactCode(bb);
  bb = restoreStrings(bb);
  if (!compact) bb = initializeJS(bb);

  if (compact) return bb;
  else return beautify(bb, { format: "js" });
};

export const commandList = (/** @type {string} */ bb) => findCommands(bb).commands.filter((cmd) => cmd.indexOf("_") !== 0);
