import express from "express";
import { readFileSync } from "fs";
import ejs from "ejs";
import { parseBB } from "./parse/parseblitz.js";
import { parseRequest } from "./requests/parseRequest.js";
import { decode } from "html-entities";
import { highlight } from "./static/js/highlight.js";
import { folder } from "./requests/folder.js";
import { getRequest } from "./requests/getRequest.js";
import { postRequest } from "./requests/postRequest.js";

const portDefault = 3001;
const port = process.env.PORT || portDefault;
const timeoutTimer = 10000;
const status = {
  ok: 200,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
};
var color = {
  reset: "\x1b[0m",
  fgRed: "\x1b[31m\x1b[1m",
  fgGreen: "\x1b[32m\x1b[1m",
  fgYellow: "\x1b[33m\x1b[1m",
  fgBlue: "\x1b[34m\x1b[1m",
  fgMagenta: "\x1b[35m\x1b[1m",
  fgCyan: "\x1b[36m\x1b[1m",
  fgWhite: "\x1b[37m\x1b[1m",
};
var app = express();

const server = app
  .use(express.urlencoded({ extended: true }))
  // .use(express.json())
  .get("/static(/css/*.css|/images/*.png|/js/*.js|/fonts/*.fon)", (req, res) => {
    parseRequest(req, res);
  })
  .get("*.(css|jpg|gif|png|bmp|ogv|wav|mp3|eot|ttf|svg|woff|woff3|html|htm)", (req, res) => {
    parseRequest(req, res, false);
  })
  .post("/_output.bb.js", (req, res) => {
    let bb = "";
    req.on("data", (data) => (bb += data));
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(parseBB(decode(bb)));
    });
  })
  .get("/_*", (req, res) => {
    getRequest(req, (fn, query) => fn(res, query));
  })
  .post("/_*", (req, res) => {
    postRequest(req, (fn, query) => fn(res, query));
  })
  .post("/highlight", (req, res) => {
    let bb = "";
    req.on("data", (data) => (bb += data));
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(highlight(bb));
    });
  })
  .get(["/*.bb.js"], (req, res) => {
    const file = req.params["0"] || "";
    const isInclude = req.query.include ? true : false;
    const bb = file && readFileSync(`${file}.bb`).toString();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(parseBB(decode(bb), isInclude));
  })
  .get(["/", "/*.bb"], (req, res) => {
    const fileFull = req.params["0"] || "";
    const file = fileFull.replace(/^(.*)\/(.*?)$/, "$2");
    const currentFolder = fileFull.replace(/^(.*)\/(.*?)$/, "$1");
    process.chdir(`${folder.shared}/${currentFolder}`);
    let html = readFileSync(`${folder.static}/html/index.html`).toString();
    html = ejs.render(html, { file });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  })
  .listen(port, () => {
    console.clear();
    return console.log(`${color.fgGreen}[SYSTEM] - Started. Listening to http://localhost:${port}${color.reset}`);
  });

server.timeout = timeoutTimer;
