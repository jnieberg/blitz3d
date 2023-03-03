import { normalize, dirname, resolve } from "path";
import { folder } from "../folder.js";

export function fn(res, query) {
  try {
    const newPath = resolve(folder.shared + "/" + query.directory);
    process.chdir(newPath);
    res.end(normalize(query.directory + "/"));
  } catch (err) {
    console.log(err);
    res.status(200).end("0");
  }
}
