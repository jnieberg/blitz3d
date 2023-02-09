import { readdir, statSync } from "fs";
import { normalize, dirname, resolve } from "path";

export function fn(res, query) {
  const folder = resolve("./" + query.folder);
  readdir(folder, (err, files) => {
    if (files) {
      const result = [];
      files.forEach((file) => {
        let type = 1;
        try {
          if (statSync(folder + "/" + file).isDirectory()) {
            type = 2;
          }
          result.push({
            name: file,
            type: type,
          });
        } catch (err) {}
      });
      res.json({
        folder: normalize(query.folder + "/"),
        file: result,
        position: 0,
      });
    } else {
      res.status(404).end("0");
    }
  });
}
