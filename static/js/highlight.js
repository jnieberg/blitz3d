import { commandList } from "../../parse/parseblitz.js";

const replaceTag = (/** @type {string} */ line, /** @type {RegExp} */ rx, /** @type {string} */ cls) => {
  return line.replace(rx, (m, m1) => {
    return `§${cls}§${(m1 || m).replace(/§([a-z]{3})§|§§/gim, "")}§§`;
  });
};

const setFunctions = (/** @type {string} */ bb) => {
  Array.from(bb.match(/(?<=\bfunction +)([a-z]\w*?\b)/gim) || []).forEach((fn) => {
    const fnRx = new RegExp(`(?<!\\bfunction +)\\b(${fn})\\b`, "gim");
    bb = replaceTag(bb, fnRx, "fun");
  });
  return bb;
};

const setFunctionProps = (/** @type {string} */ bb) => {
  Array.from(bb.matchAll(/(?<=\bfunction +[a-z]\w*?[$%#]? *)\((.*?)\)([\w\W]*?)(?=end +function)/gi) || []).forEach((fn) => {
    const propsRxString = fn[1]
      .split(/[ \t]*,[ \t]*/g)
      .map((prop) => {
        return prop.match(/(\b[a-z]\w*?\b)(?=[$%#]?)/gim) || "";
      })
      .join("|");
    if (propsRxString) {
      const propsRx = new RegExp(`\\b(${propsRxString})\\b`, "gim");
      const fnNew = replaceTag(fn[0], propsRx, "prp");
      bb = bb.replace(fn[0], fnNew);
    }
  });
  return bb;
};

const setCommands = (/** @type {string} */ bb) => {
  commandList(bb).forEach((fn) => {
    const fnRx = new RegExp(`(?<!\\w§)\\b(${fn}\\b[$%#]?)`, "gim");
    bb = replaceTag(bb, fnRx, "cmd");
  });
  return bb;
};

const setStatements = (/** @type {string} */ bb) =>
  replaceTag(
    bb,
    /(?<!\w§)\b(if|then|else|elseif|endif|while|wend|repeat|until|forever|and|or|xor|mod|shl|shr|sar|function|type|field|for|step|to|next|return|exit|select|case|not|after|before|delete|dim|each|first|last|insert|new|stop|global|const|local|end|include|data|goto)\b/gim,
    replaceTag("stm")
  );

const setTypes = (/** @type {string} */ bb) => {
  Array.from(bb.match(/(?<=\btype +)(?<!>)([a-z]\w*?\b)/gim) || []).forEach((fn) => {
    const fnRx = new RegExp(`(?<!\\type +)\\b(${fn})\\b`, "gim");
    bb = replaceTag(bb, fnRx, "typ");
  });
  return bb;
};

export const highlight = (/** @type {string} */ bb) => {
  bb = setFunctions(bb);
  bb = setFunctionProps(bb);
  bb = setTypes(bb);
  bb = setStatements(bb);
  bb = setCommands(bb);
  //   console.log(bb);
  bb = bb
    .split(/\n/gi)
    .map((line) => {
      line = replaceTag(line, /(?<![\w§])(-? *(?:\d+\.?\d*|\d*\.?\d+|\btrue\b|\bfalse\b))/gi, "num");
      line = replaceTag(line, /([()])/gi, "brk");
      line = replaceTag(line, /(?<=\bfunction(?:§§)? +)([a-z]\w*?\b[$%#]?)/gi, "fun");

      line = replaceTag(line, /(?<!\w§)([=<>])/gim, "stm");
      line = replaceTag(line, /(?<!\w§)(".*?")/gi, "str");
      line = replaceTag(line, /(?<!\w§)(;.*?$)/gim, "cmt");
      return line;
    })
    .join("\n");
  bb = bb.replace(/§([a-z]{3})§(.+?)§§/gim, `<span class="hl__$1">$2</span>`).replace(/§[a-z]{3}\b|§/gim, "");
  return bb;
};
