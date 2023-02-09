import { statSync } from "fs";
import { resolve } from "path";

export function fn(res, query) {
  try {
    const folder = resolve("./" + query.root + "/" + query.filename);
    if (statSync(folder).isDirectory()) {
      res.end("2");
    } else {
      res.end("1");
    }
  } catch (err) {
    res.status(404).end("0");
  }
}
