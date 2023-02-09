import beautify from "beautify";
import { writeFileSync } from "fs";
import { systemCommands } from "../commands.js";
import { folder } from "../requests/folder.js";
import { findOpenBracket } from "../static/js/bracket.js";
import { getFunctions } from "./getfunctions.js";
import { getVariables } from "./getvariables.js";
import { getGlobal } from "./getglobal.js";

const stringReplacer = "~~~~~~";
const stringReplacerRx = /~~~~~~/;
/**
 * @type {string[]}
 */
let stringListBackup = [];

const clearComments = (/** @type {string} */ bb) => bb.replace(/;.*?$/gm, "");

const captureStrings = (/** @type {string} */ bb) => {
  stringListBackup = Array.from(bb.match(/"(.*?)"/g) || []);
  return bb.replace(/"(.*?)"/g, stringReplacer);
};
const restoreStrings = (/** @type {string} */ bb) => {
  let i = 0;
  while (bb.search(stringReplacerRx) > -1) {
    bb = bb.replace(stringReplacerRx, stringListBackup[i].replace(/\\/g, "\\\\"));
    i += 1;
  }
  return bb;
};

const initializeBB = (/** @type {string} */ bb) => {
  return `endgraphics
loadfont 'courier',18,false,false,false
${bb}
end`;
};

// Fix example: "If cl Color a,b,c: Rect 0,0,100,100"
const cleanup = (/** @type {string} */ bb) => {
  bb = bb
    .replace(/[ \t]+/gm, " ")
    .replace(/^ +| +$/gm, "")
    .replace(/ *([(<>,=+\-*/:]) */g, "$1")
    .replace(/ *\r?\n+ */g, "\n")
    // .replace(/(?<=\W) *\b(\w+?)\b *(?=\W)/g, "$1")
    .replace(/ *\bNot\b */gim, "!")
    .replace(/\bElse +If\b/gi, "ElseIf")
    .replace(/\b(If|ElseIf)\b *([^\s]+?(?: +(?:And|Or|Xor|Mod) +[^\s]+?)*) +((?!Then|And|Or|Xor|Mod).+?)$/gim, "$1 $2 Then $3");

  while (bb.match(/\b(If|ElseIf)\b *(.+?) *\bThen\b /)) bb = bb.replace(/\b(If|ElseIf)\b *(.+?) *\bThen\b *(.+?) *$/gim, "$1 $2 Then\n$3\nEndIf");

  bb = bb
    .replace(/^(.+?) *\bElse\b *(.+?) *$/gm, "$1\nElse\n$2")
    .replace(/\bEnd +(If|Function|Select|Type)\b/gim, "End$1")
    .replace(/ *:+ */g, "\n")
    .replace(/\bThen\b */gi, "\n")
    .replace(/\b([a-z]\w*?)\b([$%#])/gi, "$1")
    .replace(/\b([a-z]\w*?(?:\(.*?\))?)\\([a-z]\w*?)\b/gi, "$1.$2");
  return bb;
};

const findCommands = (/** @type {string} */ bb) => {
  const customFunctions = Array.from(bb.matchAll(/^Function ([a-z]\w*?\b)/gim))?.map((m) => m[1]) || [];

  /** @type {string[]} */
  const commands = Object.keys(systemCommands)
    .concat(customFunctions)
    .sort((a, b) => (a < b ? 1 : -1));
  commands.forEach((systemCommandName) => {
    const cmdRx = new RegExp(`\\b${systemCommandName}\\b`, "gim"); //.replace(/\$/gm, "\\$")
    bb = bb.replace(cmdRx, `_${systemCommandName.toLowerCase()}`);
    // }
  });
  bb = bb.replace(/(?<!\()\b(_[a-z]\w*?\b)(?: (.*?$)|$)/gim, "$1($2)");
  return { bb, commands };
};

const setGlobalVariables = (/** @type {string} */ bb, /** @type {string} */ all = bb) => {
  return `${getVariables(bb, all)
    .map((v) => `global ${v}`)
    .join("\n")}\n${bb}`;
};

const setFunctionVariables = (/** @type {string} */ bb) => {
  // let functions = Array.from(bb.matchAll(/\bfunction\b([\w\W]*?)\bendfunction\b/gi)).map((fn) => setGlobalVariables(fn[1], bb));
  const functions = getFunctions(bb);
  functions.map((fn) => {
    const variables = getVariables(fn, getGlobal(bb));
    console.log(variables);
    return fn;
  });
  return bb;
};

const parseStatements = (/** @type {string} */ bb) => {
  return (
    bb
      // single operators
      .replace(/%([01]+)/gm, "parseInt('$1',2) - 4294967296")
      .replace(/\$([A-F0-9]+)/gim, "(0x$1 shr 0x100)")
      .replace(/\band\b/gim, "&")
      .replace(/\bor\b/gim, "|")
      .replace(/\^/gim, "**")
      .replace(/\bxor\b/gim, "|") //think of a solution here!
      .replace(/\bmod\b/gim, "%")
      .replace(/\bshl\b/gim, "<<")
      .replace(/\bshr\b/gim, ">>")
      .replace(/\bsar\b/gim, ">>>")

      // for conditional expressions, change single = & | into doubles == && ||, and <> into != (not).
      .replace(/(?<=(?:^(?:if|elseif|while|until|return)\b|^[a-z]\w*?=).*?)(?<![=&\|<>!])([=&\|])(?![=&\|<>])/gim, "$1$1")
      .replace(/(?<=(?:^(?:if|elseif|while|until|return)\b|^[a-z]\w*?=).*?)<>/gim, "!=")

      // add brackets to functions and make them async
      .replace(/^function\b *(_[a-z]\w*?)\((.*?)\)$/gim, "async function $1($2) {")

      // change type and field combination into class
      .replace(/^type\b *(.+?)$/gim, "class $1 {")
      .replace(/^field\b *(.+?)$/gim, (m, m1) => m1.replace(/,/gim, "\n"))
      .replace(/\b([a-z]\w*?)\.(?:[a-z]\w*?)=\b(_new\(.*?\))$/gim, "$1=$2")
      .replace(/\b([a-z]\w*?)\.([a-z]\w*?)\b/gim, "$1")

      // change dim command into a _dim() function
      .replace(/\b_dim\(([_a-z]\w*?)\((?<=\()([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*)(?=\))\)\)/gim, "var $1=_dim($2)")

      // bracketize if and else conditions
      .replace(/^if\b *(.+?)$/gim, "if($1) {")
      .replace(/^else\b$/gim, "} else {")
      .replace(/\belseif\b *(.+?)$/gim, "} else if($1) {")

      // while, repeat, until, forever and exit statements
      .replace(/^while\b *(.+?)$/gim, "while(_async()&($1)) {")
      .replace(/^repeat$/gim, "do {")
      .replace(/^until\b *(.+?)$/gim, "} while(_async()&!($1))")
      .replace(/^forever$/gim, "} while(_async())")
      .replace(/^exit$/gim, "break")

      // change "select" to "switch" statement, with their mandatory "break"
      .replace(/^select\b *(.+?)$/gim, "switch($1) {")
      .replace(/^case\b *(.+?)$/gim, "break\ncase $1:")
      .replace(/^default$/gim, "default:")
      .replace(/^endselect$/gim, "break\n}")

      // split combined global and local variables, and change them respecively into "var" and "let"
      .replace(/(?<=\b(global|local)\b.*?),/gim, "\n$1 ")
      .replace(/^global\b/gim, "var")
      .replace(/^local\b/gim, "let")

      // tricky "goto"
      .replace(/^goto\b/gim, "break")

      // change various BB "for" statements into javascript "for"
      .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)(?: *\bstep\b *(.+?))$/gim, "for(var $1=$2;$1<=$3;$1=$1+$4) {")
      .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)$/gim, "for(var $1=$2;$1<=$3;$1+=1) {")
      .replace(/^for\b *(.+?)\.(?:.+?)=_(.+?)$/gim, "for(var $1 of _$2) {")

      // data blocks
      .replace(/\n\.([a-z]\w*?)\ndata\b (.*?)$/gi, "_data('$1',$2)")

      // closing statements
      .replace(/^(endif|wend|next|endfunction|endtype)$/gim, "}")

      // commands with identical name that need to be lower-cased
      .replace(/\b(return|true|false|const)\b/gim, (/** @type {string} */ match) => match.toLowerCase())

      // make all function calls "await"-ing
      .replace(/(?<!\bnew |\bfunction )_([a-z]\w*?)\b/gim, "await _$1")
  );
};

const parseDims = (/** @type {string} */ bb) => {
  // search DIM
  const dims = Array.from(
    //\b_dim\(([_a-z]\w*?)\((?<=\()([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*)(?=\))\)\)
    bb.matchAll(/(\b[a-z]\w*?)=await _dim\(/gim)
  );
  dims.map((d) => {
    const variable = d[1];
    const dimensions = d[2];
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

const fixLabels = (/** @type {string} */ bb) => {
  let l;
  while ((l = Array.from(bb.matchAll(/(}[^}]*?\n\.)([_a-z]\w*?)\b/gi))[0])) {
    const rest = l[1];
    const label = l[2];
    const end = l.index; //bb.search(/}\n\.[_a-z]\w*?\b/gi);
    const start = findOpenBracket(bb, end);
    // console.log(1111, bb.substring(start, end), label, start, end);
    bb = `${bb.substring(0, start)}\n${label}:\n{${bb.substring(start, end + 1)}}${bb.substring(end + rest.length + label.length)}`;
  }
  return bb;
};

const fixSyntax = (/** @type {string} */ bb) => bb.replace(/\b(switch(.*?) {)\nbreak/gi, "$1");

const applySemicolons = (/** @type {string} */ bb) => {
  return bb.replace(/([^{}:\n])$/gim, "$1;");
};

const initializeJS = (/** @type {string} */ bb) => {
  return `(async () => {
  try {
    ${bb}
  } catch(error) {
    if(error && error.message) _errorlog(error.stack, true);
  }
})()`;
};

export const parseBB = (/** @type {string} */ bb, /** @type {boolean} */ isInclude = false) => {
  // console.clear();

  let /** @type {string[]} */ commands = [];
  if (!isInclude) bb = initializeBB(bb);
  bb = clearComments(bb);
  bb = captureStrings(bb);
  bb = cleanup(bb);
  // bb = cleanup(bb);
  ({ bb, commands } = findCommands(bb));
  // bb = findCommands(bb).bb;
  bb = setFunctionVariables(bb);
  bb = setGlobalVariables(bb);
  bb = parseStatements(bb);
  bb = parseDims(bb);
  bb = fixLabels(bb);
  bb = fixSyntax(bb);
  bb = applySemicolons(bb);

  bb = restoreStrings(bb);
  bb = initializeJS(bb);

  // writeCommands(commands);
  return beautify(bb, { format: "js" });
};

export const commandList = (/** @type {string} */ bb) => findCommands(bb).commands.filter((cmd) => cmd.indexOf("_") !== 0);
