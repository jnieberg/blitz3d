import { lstatSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { folder } from "./requests/folder.js";

const traverseDir = (
  /** @type {string} */ dir,
  /** @type {Object.<string, { name: string; path: string; source: string; props: string[]; async: boolean; }>} */ files = {}
) => {
  readdirSync(dir).forEach((file) => {
    const name = file.replace(/\..*?$/g, "");
    const fullPath = join(dir, file);
    if (lstatSync(fullPath).isDirectory()) {
      files = { ...files, ...traverseDir(fullPath) };
    } else {
      const source = readFileSync(fullPath).toString();
      const props = (source.match(/(?<=\bfunction\b *.*?\()(.*?)(?=\) *{\n)/i) || [])[0]?.split(/ *, */g) || [];
      const async = !!source.match(/\breturn new Promise|async function\b/);
      files[name] = { name, path: fullPath, source, props, async };
    }
  });
  return files;
};

/** @type {Object.<string, { name: string; path: string; source: string; props: string[]; async: boolean; }>} */
export let systemCommands = traverseDir(folder.commands);
