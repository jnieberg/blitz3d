import beautify from "beautify";
import { systemCommands } from "../commands.js";
import { getFunctions } from "./getfunctions.js";
import { getVariables } from "./getvariables.js";
import { getGlobal } from "./getglobal.js";
import { getProperties } from "./getproperties.js";
import { readFileSync } from "fs";

const stringReplacer = "~~~";
const stringReplacerRx = /~~~(\d+)~~~/;
/**
 * @type {string[]}
 */
let stringListBackup = [];
let stringListBackupCounter = 0;

const parseIncludes = (/** @type {string} */ bb) => {
  bb = bb.replace(/^ *include *" *(.*?) *" *$/gim, (m, m1) => {
    const include = readFileSync(m1).toString();
    return include;
  });
  return bb;
};

const clearComments = (/** @type {string} */ bb) => bb.replace(/;.*?$/gm, "");

const captureStrings = (/** @type {string} */ bb) => {
  stringListBackup = Array.from(bb.match(/"(.*?)"/g) || []);
  stringListBackupCounter = 0;
  while (bb.match(/"(.*?)"/)) bb = bb.replace(/"(.*?)"/, stringReplacer + stringListBackupCounter++ + stringReplacer);
  return bb;
};

const restoreStrings = (/** @type {string} */ bb) => {
  while (bb.match(stringReplacerRx)) bb = bb.replace(stringReplacerRx, (m, m1) => stringListBackup[m1].replace(/\\/g, "\\\\"));
  return bb;
};

const initializeBB = (/** @type {string} */ bb, /** @type {string} */ folder) => {
  return `endgraphics
readdir ""
loadfont "courier",18,false,false,false
${bb}
end`;
};

// Fix example: "If cl Color a,b,c: Rect 0,0,100,100"
const cleanup = (/** @type {string} */ bb) => {
  bb = bb
    .toLowerCase()
    .replace(/[ \t]+/gm, " ")
    .replace(/^ +| +$/gm, "")
    .replace(/ *([()<>,=+\-*/:^]) */g, "$1")
    .replace(/ *\) *(?=\w)/g, ") ")
    .replace(/ *\r?\n+ */g, "\n")
    .replace(/ *\bNot\b */gim, "!")
    .replace(/\bElse +If\b/gi, "ElseIf")
    .replace(/\b(If|ElseIf)\b *([^\s]+?(?: +(?:And|Or|Xor|Mod) +[^\s]+?)*) +((?!Then|And|Or|Xor|Mod).+?)$/gim, "$1 $2 Then $3");

  console.log(bb);
  while (bb.match(/\bIf\b *(.+?) *\bThen\b /im)) bb = bb.replace(/\bIf\b *(.+?) *\bThen\b *(.+?) *$/gim, "If $1\n$2\nEndIf");
  while (bb.match(/\bElseIf\b *(.+?) *\bThen\b /im)) bb = bb.replace(/\bElseIf\b *(.+?) *\bThen\b *(.+?) *$/gim, "\nElseIf $1\n$2");
  bb = bb
    .replace(/^(.+?) *\bElse\b *(.+?) *$/gim, "$1\nElse\n$2")
    .replace(/\bEnd +(If|Function|Select|Type)\b/gim, "End$1")
    .replace(/ *:+ */g, "\n")
    .replace(/(^\.[a-z]\w*?) (.+?$)/gim, "$1\n$2")
    .replace(/\bThen\b */gi, "\n")
    .replace(/\b([a-z]\w*?)\b[$%#]/gi, "$1")
    .replace(/\b([a-z]\w*?)\.(?:[a-z]\w*?)=\b(new .*?)$/gim, "$1=$2")
    .replace(/\b([a-z]\w*?)\.([a-z]\w*?)\b/gim, "$1")
    .replace(/\\([a-z]\w*?)\b/gi, ".$1")
    .replace(/^Read (.*?)$/gim, "$1=Read $1");

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
  bb = bb.replace(/(?<=\W )(\b_[a-z]\w*?\b)/gi, "\n$1");
  while (bb.match(/(?<!\()\b(_[a-z]\w*?\b)(?: (.*?$)|$)/gim)) bb = bb.replace(/(?<!\()\b(_[a-z]\w*?\b)(?: (.*?$)|$)/gim, "$1($2)");
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
${variables.map((v) => `local ${v}`).join("\n")}
${fn[1]}
${fn[2]}`;
  })
  .join("\n")}`;
};

const parseStatements = (/** @type {string} */ bb) => {
  bb = bb
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
    .replace(/\bsar\b/gim, ">>>");

  // tricky "label"s and loopy "goto"s
  while (bb.match(/^\.([a-z]\w*?\b)/gim)) {
    bb = bb.replace(
      /(?<=function.*?\n)([\w\W]*?)\.([a-z]\w*?\b)([\w\W]*?)(?=(?:end )?function.*?\n|$)/gi,
      "__$2: while(_async()) {\n$1break\n}\n__$2_: while(_async()) {$3break\n}\n"
    );
    bb = bb.replace(
      /^([\w\W]*?)\.([a-z]\w*?\b)([\w\W]*?)(?=(?:end )?function.*?\n|$)/gi,
      "__$2: while(_async()) {\n$1break\n}\n__$2_: while(_async()) {$3break\n}\n"
    );
  }

  bb = bb
    .replace(/(?<=\b__([a-z]\w*?)_: [\w\W]*?)(?:\bgoto \1\b)/gi, "continue __$1_")
    .replace(/(?<=\b__([a-z]\w*?)_: [\w\W]*?)(?:\bgoto [a-z]\w*?\b)/gi, "break __$1_")
    .replace(/\b(?:goto|gosub) ([a-z]\w*?)\b/gi, "break __$1")

    // for conditional expressions, change single = & | into doubles == && ||, and <> into != (not).
    .replace(/(?<=(?:^(?:if|elseif|while|until|return)\b|^[a-z]\w*?=).*?)(?<![=&\|<>!])([=&\|])(?![=&\|<>])/gim, "$1$1")
    .replace(/(?<=(?:^(?:if|elseif|while|until|return)\b|^[a-z]\w*?=).*?)<>/gim, "!=")

    // add brackets to functions and make them async
    .replace(/^function\b *(_[a-z]\w*?)\((.*?)\)$/gim, "async function $1($2) {")

    // change type and field combination into class
    .replace(/^type\b *(.+?)$/gim, "class $1 {")
    .replace(/^field\b *(.+?)$/gim, (m, m1) => `${m1.replace(/,/gim, '=""\n')}=""`)

    // change dim command into a _dim() function
    .replace(/\b_dim\(([_a-z]\w*?)\((?<=\()([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*)(?=\))\)\)/gim, "var $1=_dim($2)")

    // bracketize if and else conditions
    .replace(/^if\b *(.+?)$/gim, "if($1) {")
    .replace(/^else\b$/gim, "} else {")
    .replace(/\belseif\b *(.+?)$/gim, "} else if($1) {")

    // while, repeat, until, forever and exit statements
    .replace(/^while\b *(.+?)$/gim, "while(_async()&&($1)) {")
    .replace(/^repeat$/gim, "do {")
    .replace(/^until\b *(.+?)$/gim, "} while(_async()&&!($1))")
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
    .replace(/(?<=^(?:let|var|const) )(\b[a-z]\w*?\b)(?!=)/gim, '$1=""')

    // change various BB "for" statements into javascript "for"
    .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)(?: *\bstep\b *(.+?))$/gim, "for($1=$2;$1<=$3;$1=$1+$4) {")
    .replace(/^for\b *(.+?)=(.+?) *\bto\b *(.+?)$/gim, "for($1=$2;$1<=$3;$1+=1) {")
    .replace(/^for\b *(.+?)=_(.*?[^{\n])$/gim, "for($1 of _$2) {")

    // data blocks
    .replace(/^\.([a-z]\w*?)((\n_data\b\(.*?\))+)/gim, '_data("$1",$2)')
    .replace(/,?\n_data\((.*?)\)/gi, ",$1")
    .replace(/^_restore\((.*?)\)$/gim, '_restore("$1")')

    // closing statements
    .replace(/^(endif|wend|next|endfunction|endtype)$/gim, "}")

    // commands with identical name that need to be lower-cased
    .replace(/\b(return|true|false|const)\b/gim, (/** @type {string} */ match) => match.toLowerCase())

    // tricky and loopy "goto"s
    // .replace(/^\.([a-z]\w*?\b)([^{}]*?)\n\bgoto \1\b/gim, "$1: while(_async()) {$2\ncontinue $1\nbreak\n}")
    // .replace(/^\.([a-z]\w*?\b)([\w\W]*)$/gi, "_$1__s: {$2\n}")
    // .replace(/^([\w\W]*{\n)(.*?)\.([a-z]\w*?\b)/gi, "_$1__s: {$2\n}")
    // .replace(/^goto\b/gim, "break")

    // make all function calls "await"-ing
    .replace(/(?<!\bnew |\bfunction )_([a-z]\w*?)(?=\()\b/gim, "await _$1");

  return bb;
};

const parseDims = (/** @type {string} */ bb) => {
  // search DIM
  const dims = Array.from(bb.matchAll(/(\b[a-z]\w*?)=await _dim\(/gim));
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
  // let l;
  // while ((l = Array.from(bb.matchAll(/(?:}([^}]*?)\n\.)([_a-z]\w*?)\b/gi))[0])) {
  //   const rest = l[1];
  //   const label = l[2];
  //   const end = l.index;
  //   const start = findOpenBracket(bb, end);
  //   bb = `${bb.substring(0, start)}\n${label}:\n{${bb.substring(start, end + 1)}}${rest}${bb.substring(end + rest.length + label.length + 3)}`;
  // }

  // bb = bb.replace(/(?<=^[\w\W]*\b)/gi);

  return bb;
};

const fixSyntax = (/** @type {string} */ bb) => bb.replace(/\b(switch(.*?) {)\nbreak/gi, "$1");

const applySemicolons = (/** @type {string} */ bb) => {
  return bb.replace(/([^{}:\n])$/gim, "$1;");
};

const underscoreVariables = (/** @type {string} */ bb) => {
  const variables = bb.match(/(?<=^(?:var|let|const) )([a-z]\w*?\b)/gim) || [];
  variables.forEach((v) => {
    const vRx = new RegExp(`\\b(${v})\\b`, "gim");
    bb = bb.replace(vRx, "_$1");
  });
  return bb;
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

export const parseBB = (/** @type {string} */ bb, /** @type {boolean} */ isInclude = false, /** @type {string} */ folder = "") => {
  if (!isInclude) bb = initializeBB(bb, folder);
  bb = parseIncludes(bb);
  bb = clearComments(bb);
  bb = captureStrings(bb);
  bb = cleanup(bb);
  ({ bb } = findCommands(bb));
  bb = setFunctionVariables(bb);
  bb = setGlobalVariables(bb);
  bb = parseStatements(bb);
  bb = parseDims(bb);
  bb = fixLabels(bb);
  bb = fixSyntax(bb);
  bb = applySemicolons(bb);
  bb = underscoreVariables(bb);

  bb = restoreStrings(bb);
  bb = initializeJS(bb);

  return beautify(bb, { format: "js" });
};

export const commandList = (/** @type {string} */ bb) => findCommands(bb).commands.filter((cmd) => cmd.indexOf("_") !== 0);
