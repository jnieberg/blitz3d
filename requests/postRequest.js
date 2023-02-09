import { parse } from "url";
import { folder } from "./folder.js";

export const postRequest = (
  /** @type {import("express-serve-static-core").Request<{}, any, any, import("qs").ParsedQs, Record<string, any>>} */ req,
  /** @type {{ (fn: (arg0: import("express-serve-static-core").Response<any, Record<string, any>, number>, arg1: any) => any, query: any): any; (arg0: () => void, arg1: string): void; }} */ callback
) => {
  var urlParts = parse(req.url, true);
  const filename = urlParts.pathname?.substring(2);
  let queryRaw = "";
  req.on("data", (chunk) => {
    queryRaw += chunk.toString();
  });
  req.on("end", async () => {
    const query = JSON.parse(queryRaw);
    try {
      const file = await import(`${folder.requests}/${filename}.js`);
      const fn = file["fn"];
      callback(fn, query);
    } catch (err) {
      console.log(err);
      callback(() => {}, query);
    }
  });
};
