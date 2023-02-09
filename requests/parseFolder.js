import { readdirSync, statSync } from "fs";
import { normalize, resolve } from "path";
import { folder } from "./folder.js";

/**
 * @param {import("express-serve-static-core").Request<{}, any, any, import("qs").ParsedQs, Record<string, any>>} req
 * @param {import("express-serve-static-core").Response<any, Record<string, any>, number>} res
 */
export function parseFolder(req, res) {
  const url = normalize(decodeURI(req.url))
    .replace(/\\/g, "/")
    .replace(/\/[^\/]+?\.[^\/]+?$/, "")
    .replace(/\/$/, "");
  const urlPart = url.split("/");
  const dir = normalize(`${folder.shared}${url}`);
  let files;
  try {
    files = readdirSync(dir);
  } catch (err) {
    return;
  }
  if (files) {
    /**
     * @typedef Result
     * @type {object}
     * @property {string[]} file
     * @property {string[]} folder
     */
    /** @type {Result}} */
    let result = {
      file: [],
      folder: [],
    };
    if (url !== "/") {
      let urlLast = "";
      const urlWhole = urlPart.map((res, index) => {
        urlLast += res + "/";
        if (index === urlPart.length - 1) {
          return `<span class="back">${res || "."}</span>`;
        } else {
          return `<a href="${urlLast}" class="back">${res || "."}</a>`;
        }
      });
      result.folder.push(`<li class="heading">${urlWhole.join("/")}</li>`);
    } else {
      result.folder.push(`<li class="heading"><span>${url}</span></li>`);
    }
    files.forEach((file) => {
      const href = normalize(`${url}/${file}`).replace(/\\/g, "/");
      let type = "file";
      if (statSync(dir + "/" + file).isDirectory()) {
        type = "folder";
      }
      result[type].push(`<li><a href="${href}" class="${type}">${file}</a></li>`);
    });
    return `<a class="reload" href="/reload" alt="Reload page" title="Reload page">↺</a>
<ul>
	${result.folder.join("")}
	${result.file.join("")}
</ul>`;
  }
  return "";
}
