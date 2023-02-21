import { createReadStream } from "fs";
import { parse } from "url";
import { parseFile as parseMusicFile } from "music-metadata";
import { folder } from "./folder.js";
const status = {
  ok: 200,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
};
var mimetype = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".txt": "text/plain",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "application/x-font-ttf",
  ".woff": "application/x-font-woff",
  ".woff2": "text/plain",
  ".fon": "application/octet-stream",
  ".ogv": "application/ogg",
  ".wav": "audio/mpeg",
  ".mp3": "audio/mpeg",
};

/**
 * @param {import("url").UrlWithStringQuery} requestUrl
 * @param {import("express-serve-static-core").Response<any, Record<string, any>, number>} res
 * @param {string} mime
 */
function parseRequestEnd(requestUrl, res, mime, baseDirectory = folder.base, referer = "/", sampleRate = 4400, stat = status.ok) {
  const fileStream = createReadStream(`${baseDirectory}${decodeURI(requestUrl.pathname || "")}`);
  ((fStream, resp) => {
    res.writeHead(stat, "", {
      Referer: referer,
      "Accept-Ranges": "bytes",
      "Transfer-Encoding": "chunked",
      Vary: "Accept-Encoding",
      "Content-Type": mime,
      "Sample-Rate": sampleRate,
    });
    const isBinary =
      mime === "audio/mpeg" ||
      mime === "image/jpeg" ||
      mime === "image/png" ||
      mime === "image/gif" ||
      mime === "image/bmp" ||
      mime === "application/ogg" ||
      mime === "application/x-font-ttf" ||
      mime === "application/x-font-woff" ||
      mime === "application/octet-stream";
    let body = "";

    if (isBinary) {
      fStream.setEncoding("binary");
    }
    fStream.on("data", (data) => {
      body = body + data;
    });
    fStream.on("end", () => {
      if (isBinary) {
        resp.end(body, "binary");
      } else {
        resp.end(body);
      }
    });
    fStream.on("error", () => {
      resp.status(status.notFound).end();
    });
  })(fileStream, res);
}

/**
 * @param {import("express-serve-static-core").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>} req
 * @param {import("express-serve-static-core").Response<any, Record<string, any>, number>} res
 */
export function parseRequest(req, res, isBaseDirectory = true) {
  const dir = isBaseDirectory ? folder.base : folder.shared;
  const requestUrl = isBaseDirectory ? parse(req.url) : parse(req.url);
  let pathname = null;
  if (requestUrl?.pathname) {
    pathname = decodeURI(requestUrl.pathname);
    const ext = pathname.replace(/^.*(?=\.)/, "");
    const mime = mimetype[ext] || "text/html";
    const referer = (typeof req.headers.referrer === "string" ? req.headers.referrer : req.headers?.referrer?.join("")) || req.headers.referer || "/";
    if (mime === "audio/mpeg") {
      parseMusicFile(`${dir}${pathname}`)
        .then((metadata) => parseRequestEnd(requestUrl, res, mime, dir, referer, metadata.format.sampleRate))
        .catch(() => parseRequestEnd(requestUrl, res, mime, dir, referer, undefined, status.notFound));
    } else {
      parseRequestEnd(requestUrl, res, mime, dir, referer);
    }
  }
}
