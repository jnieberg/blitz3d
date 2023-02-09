import { readFile } from "fs";
import { normalize, dirname, resolve } from "path";

export function fn(res, query) {
  try {
    const filename = resolve("./" + query);
    readFile(filename, "binary", (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).end("0");
      }
      res.end(data);
    });
  } catch (err) {
    res.status(404).end("0");
  }
}
