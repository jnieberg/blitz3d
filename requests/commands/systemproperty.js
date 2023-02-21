import { folder } from "../../requests/folder.js";

export function fn(res, query) {
  const appdir = res.req.rawHeaders[res.req.rawHeaders.findIndex((h) => h === "Referer") + 1];
  const props = {
    systemdir: folder.base,
    windowsdir: process.env["windir"],
    tempdir: process.env["TEMP"],
    appdir: appdir,
  };
  if (props[query]) {
    res.end(props[query]);
  } else {
    res.end(process.env[query]);
  }
}
