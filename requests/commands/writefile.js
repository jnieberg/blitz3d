import { writeFile } from "fs";

export function fn(res, query) {
  try {
    const filename = process.cwd() + query.name;
    writeFile(filename, query.data, "binary", (err, data) => {
      if (err) throw err;
      res.json({
        name: query.name,
        data: query.data,
        position: 0,
        readonly: false,
      });
    });
  } catch (err) {
    res.status(404).end();
  }
}
