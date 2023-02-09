import { normalize, dirname } from "path";

export function fn(res, query) {
  try {
    const newPath = normalize("./public/" + query.directory);
    process.chdir(newPath);
    res.end(normalize(query.directory + "/"));
  } catch (err) {
    console.log(err);
    res.status(404).end("0");
  }
}
