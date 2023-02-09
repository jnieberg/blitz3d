import { parse } from "url";
import express from "express";
import { parseBB, endProgram } from "./parse/parseblitz.js";
import { postRequest } from "./requests/postRequest.js";
import { getRequest } from "./requests/getRequest.js";
import { parseRequest, parseRequestBB } from "./requests/parseRequest.js";
import { parseFolder } from "./requests/parseFolder.js";
import { printCommands } from "./commands.js";
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

/**
 * @param {import("express-serve-static-core").Request<{}, any, any, import("qs").ParsedQs, Record<string, any>>} req
 * @param {string} body
 */
function writeHtml(req, body) {
  const requestUrl = parse(req.url);
  const pathname = decodeURI(requestUrl.pathname || "");
  return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	// <script src="/static/js/howler.core.js"></script>
	// <script src="/static/js/howler.spatial.js"></script>
	<link rel="stylesheet" type="text/css" href="/static/css/blitz3d.css">
	<style id="blitzFonts"></style>
	<title>Blitz3D - ${pathname.replace(/^\//, "")}</title>
</head>

<body>
	${body}
</body>
</html>`;
}

const server = app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .post("/run", (req, res) => {
    let body = "";
    req.on("data", (data) => {
      body = body + data;
    });
    req.on("end", () => {
      const result = parseBB(body, "/");
      res.end(`console.log(\`${result}\`);`);
    });
    req.on("error", (err) => {
      res.status(status.notFound).end();
    });
  })
  .get("/_*", (req, res) => {
    getRequest(
      req,
      (
        /** @type {(arg0: import("express-serve-static-core").Response<any, Record<string, any>, number>, arg1: any) => any} */ fn,
        /** @type {any} */ query
      ) => fn(res, query)
    );
  })
  .post("/_*", (req, res) => {
    postRequest(
      req,
      (
        /** @type {(arg0: import("express-serve-static-core").Response<any, Record<string, any>, number>, arg1: any) => any} */ fn,
        /** @type {any} */ query
      ) => fn(res, query)
    );
  })
  .get("*.bb", (req, res) => {
    const requestUrl = parse(req.url);
    const result = parseFolder(req, res);
    res.end(
      writeHtml(
        req,
        `<div id="blitzFolder">${result}</div>
	<canvas id="blitz" width="400" height="300"></canvas>
	<pre class="debug"><code></code></pre>
	<img src="/static/images/mouse.png" id="blitzPointer" width="24" height="24" class="hide">
	<script src="/blitz3d.js"></script>
	<script src="${requestUrl.pathname}.js"></script>`
      )
    );
  })
  .get("/blitz3d.js", (req, res) => {
    res.end(printCommands());
  })
  .get("/reload", (req, res) => {
    const referer = (typeof req.headers.referrer === "string" ? req.headers.referrer : req.headers.referrer?.join("")) || req.headers.referer || "/";
    res.redirect(referer);
  })
  .get("*.bb.js", (req, res) => {
    parseRequestBB(req, res);
    res.setTimeout(timeoutTimer, () => {
      res.status(status.notFound).end();
    });
  })
  .get("/static(/css/*.css|/images/*.png|/js/*.js|/fonts/*.fon)", (req, res) => {
    parseRequest(req, res);
  })
  .get("*.(css|jpg|gif|png|bmp|ogv|wav|mp3|eot|ttf|svg|woff|woff3|html|htm)", (req, res) => {
    parseRequest(req, res, false);
  })
  .get("/", (req, res) => {
    const result = parseFolder(req, res);
    res.end(
      writeHtml(
        req,
        `<div id="blitzFolder">${result}</div>
<textarea id="blitzInput">; Your custom code</textarea>
<canvas id="blitz" width="400" height="300"></canvas>
<pre class="debug"><code></code></pre>
<script src="/blitz3d.js"></script>
<div id="blitzScript"></div>
<img src="/static/images/mouse.png" id="blitzPointer" width="24" height="24" class="hide">
<script>
var _eventText = document.querySelector('#blitzInput');
var _blitzCode = localStorage.getItem('blitz3d-source');
if(_blitzCode) _eventText.value = _blitzCode;
function _eventTextExecute(callback = () => {}) {
	const text = _eventText.value;
	localStorage.setItem('blitz3d-source', text);
}

_eventText.addEventListener('input', () => _eventTextExecute());
_eventTextExecute();
</script>`
      )
    );
  })
  .get("/*", (req, res) => {
    const result = parseFolder(req, res);
    if (result) {
      res.end(writeHtml(req, `<div id="blitzFolder">${result}</div>`));
    } else {
      res.status(status.forbidden).end();
    }
  })
  .listen(port, () => {
    return console.log(`${color.fgGreen}[SYSTEM] - Started. Listening to http://localhost:${port}${color.reset}`);
  });

server.timeout = timeoutTimer;
