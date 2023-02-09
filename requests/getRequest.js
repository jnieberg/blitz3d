import url from "url";
import { folder } from "./folder.js";

export const getRequest = async (
  /** @type {import("express-serve-static-core").Request<{}, any, any, import("qs").ParsedQs, Record<string, any>>} */ req,
  /** @type {{ (fn: (arg0: import("express-serve-static-core").Response<any, Record<string, any>, number>, arg1: any) => any, query: any): any; (arg0: () => void, arg1: string): void; }} */ callback
) => {
  var urlParts = url.parse(req.url, true);
  const filename = urlParts.pathname?.substring(2);
  const query = urlParts.search ? urlParts.search.substring(1) : "";
  try {
    const file = await import(`${folder.requests}/${filename}.js`);
    const fn = file["fn"];
    callback(fn, decodeURI(query));
  } catch (err) {
    console.log(err);
    callback(() => {}, decodeURI(query));
  }
};
