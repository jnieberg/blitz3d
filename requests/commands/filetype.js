import { statSync } from "fs";
import { resolve } from "path";
import { folder } from "../folder.js";

export function fn(res, query) {
  try {
    const fol = resolve(folder.shared + "/" + query.folder + "/" + query.filename);
    if (statSync(fol).isDirectory()) {
      res.end("2");
    } else {
      res.end("1");
    }
  } catch (err) {
    res.status(404).end("0");
  }
}
