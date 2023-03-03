import { readdir, readdirSync, statSync } from "fs";
import { normalize, resolve } from "path";
import { folder } from "../folder.js";

export function fn(res, query) {
  const fol = resolve(folder.shared + "/" + query.folder);
  let files;
  try {
    files = readdirSync(fol); //, (err, files) => {
  } catch (err) {}
  if (files) {
    /**
     * @type {{ name: string; type: number; }[]}
     */
    const result = [];
    files.forEach((file) => {
      let type = 1;
      try {
        if (statSync(fol + "/" + file).isDirectory()) {
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
    res.status(200).end("0");
  }
  // });
}
