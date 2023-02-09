import { lstatSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { folder } from "./requests/folder.js";

const traverseDir = (/** @type {string} */ dir, /** @type {Object.<string, { name: string; path: string; source: String; }>} */ files = {}) => {
  readdirSync(dir).forEach((file) => {
    const name = file.replace(/\..*?$/g, "");
    const fullPath = join(dir, file);
    if (lstatSync(fullPath).isDirectory()) {
      files = { ...files, ...traverseDir(fullPath) };
    } else {
      const source = readFileSync(fullPath).toString();
      files[name] = { name, path: fullPath, source };
    }
  });
  return files;
};

/** @type {Object.<string, { name: string; path: string; source: String; }>} */
export let systemCommands = traverseDir(folder.commands);
