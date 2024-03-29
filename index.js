import express from "express";
import { readFileSync, writeFileSync } from "fs";
import ejs from "ejs";
import { parseBB } from "./parse/parseblitz.js";
import { parseRequest } from "./requests/parseRequest.js";
import { decode } from "html-entities";
import { highlight } from "./static/js/highlight.js";
import { folder } from "./requests/folder.js";
import { getRequest } from "./requests/getRequest.js";
import { postRequest } from "./requests/postRequest.js";
import { systemCommands } from "./commands.js";
import { parseFolder } from "./requests/parseFolder.js";

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

const writeCommands = () => {
  const commands = Object.keys(systemCommands).sort((a, b) => (a < b ? 1 : -1));
  const commandsString = `${commands.map((cmd) => systemCommands[cmd]?.source || "").join("\n")}`;
  writeFileSync(`${folder.static}/js/_commands.jsb`, commandsString);
};

const server = app
  .use(express.urlencoded({ extended: true }))
  .get("/static/js/_commands.jsb", (req, res) => {
    writeCommands();
    parseRequest(req, res);
  })
  .get("/static/*", (req, res) => {
    parseRequest(req, res);
  })
  .get("*.(css|jpg|gif|png|bmp|ogv|wav|mp3|eot|ttf|svg|mp4|webm|woff|woff3|html|htm)", (req, res) => {
    parseRequest(req, res, false);
  })
  .post("/_output.bb.js", (req, res) => {
    let bb = "";
    req.on("data", (data) => (bb += data));
    req.on("end", () => {
      bb = decode(bb);
      res.writeHead(status.ok, { "Content-Type": "text/javascript" });
      res.end(parseBB({ bb }));
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
      res.writeHead(status.ok, { "Content-Type": "text/plain" });
      res.end(highlight(bb));
    });
  })
  .get(["/*.bb.js"], (req, res) => {
    const fileFull = req.params["0"] || "";
    const file = fileFull.replace(/^(.*?)([^/]*?)$/, "$2");
    const bb = file && readFileSync(`${file}.bb`).toString();
    res.writeHead(status.ok, { "Content-Type": "text/javascript" });
    res.end(parseBB({ bb: decode(bb) }));
  })
  .get(["/*"], (req, res) => {
    const fileFull = req.params["0"].slice(-3) === ".bb" ? req.params["0"] : "";
    const currentFolder = fileFull.replace(/^(.*?)([^/]*?)$/, "$1");
    process.chdir(`${folder.shared}/${currentFolder}`);
    const parsedFolder = parseFolder(req, res);
    let html = readFileSync(`${folder.static}/html/index.html`).toString();
    html = ejs.render(html, { file: fileFull, folder: parsedFolder });
    res.writeHead(status.ok, { "Content-Type": "text/html" });
    res.end(html);
  })
  .listen(port, () => {
    return console.log(`${color.fgGreen}[SYSTEM] - Started. Listening to http://localhost:${port}${color.reset}`);
  });

server.timeout = timeoutTimer;
