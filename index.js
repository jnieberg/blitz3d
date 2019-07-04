// @ts-nocheck
/* eslint-env browser, node */
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const blitz = require('./blitz');
const { postRequest } = require('./requests/postRequest');
const { getRequest } = require('./requests/getRequest');
const { parseRequest, parseRequestBB } = require('./requests/parseRequest');
const baseDirectory = process.cwd();
const workingDirectory = baseDirectory.replace(/\\/g, '/');
const portDefault = 3000;
const port = process.env.PORT || portDefault;
const timeoutTimer = 10000;
const status = {
	ok: 200,
	badRequest: 400,
	forbidden: 403,
	notFound: 404
};
var color = {
	reset: '\x1b[0m',
	fgRed: '\x1b[31m\x1b[1m',
	fgGreen: '\x1b[32m\x1b[1m',
	fgYellow: '\x1b[33m\x1b[1m',
	fgBlue: '\x1b[34m\x1b[1m',
	fgMagenta: '\x1b[35m\x1b[1m',
	fgCyan: '\x1b[36m\x1b[1m',
	fgWhite: '\x1b[37m\x1b[1m',
};
var app = express();

function writeHtml(req, body) {
	const requestUrl = url.parse(req.url);
	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<script src="tools/howler.core.js"></script>
	<script src="tools/howler.spatial.js"></script>
	<link rel="stylesheet" type="text/css" href="css/blitz3d.css">
	<title>Blitz3D - ${requestUrl.pathname.replace(/^\//, '')}</title>
</head>

<body>
	${body}
</body>
</html>`
}

const server = app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.post('/run', (req, res) => {
		let body = '';
		req.on('data', (data) => {
			body = body + data;
		});
		req.on('end', () => {
			const result = blitz.parseBB(body);
			res.end(result);
		});
		req.on('error', (err) => {
			res.status(status.notFound).end();
		});
	})
	.get('/_*', (req, res) => {
		getRequest(req, (fn, query) => fn(res, query));
	})
	.post('/_*', (req, res) => {
		postRequest(req, (fn, query) => fn(res, query));
	})
	.get('*.bb', (req, res) => {
		const requestUrl = url.parse(req.url);
		res.end(writeHtml(req, `<canvas id="blitz" width="400" height="300"></canvas>
	<pre class="debug"><code></code></pre>
	<img src="images/mouse.png" id="blitzPointer" width="24" height="24">
	<script src="blitz3d.js"></script>
	<script src="${requestUrl.pathname}.js"></script>`));
	})
	.get('/blitz3d.js', (req, res) => {
		res.end(blitz.parseBlitz());
	})
	.get('/tools/*.js', (req, res) => {
		parseRequest(req, res, 'text/javascript');
	})
	.get('*.js', (req, res) => {
		parseRequestBB(req, res);
		res.setTimeout(timeoutTimer, () => {
			res.status(status.notFound).end();
		});
	})
	.get('*.css', (req, res) => {
		parseRequest(req, res, 'text/css');
	})
	.get('*.jpg', (req, res) => {
		parseRequest(req, res, 'image/jpeg');
	})
	.get('*.gif', (req, res) => {
		parseRequest(req, res, 'image/gif');
	})
	.get('*.png', (req, res) => {
		parseRequest(req, res, 'image/png');
	})
	.get('*.bmp', (req, res) => {
		parseRequest(req, res, 'image/bmp');
	})
	.get('*.ogv', (req, res) => {
		parseRequest(req, res, 'application/ogg');
	})
	.get('*.wav', (req, res) => {
		parseRequest(req, res, 'audio/mpeg');
	})
	.get('/', (req, res) => {
		res.end(writeHtml(req, `<textarea id="blitzText">; Your custom code</textarea>
<canvas id="blitz" width="400" height="300"></canvas>
<pre class="debug"><code></code></pre>
<script src="blitz3d.js"></script>
<div id="blitzScript"></div>
<img src="images/mouse.png" id="blitzPointer" width="24" height="24">
<script>
var _eventText = document.querySelector('#blitzText');
var _blitzCode = localStorage.getItem('blitz3d-source');
if(_blitzCode) {
	_eventText.value = _blitzCode;
}
function _eventTextExecute(callback = () => {}) {
	const text = _eventText.value;
	localStorage.setItem('blitz3d-source', text);
	const scriptContainer = document.querySelector('#blitzScript');
	document.querySelector('.debug code').innerHTML = '';
	var xhr = new XMLHttpRequest();
  xhr.open('POST', '/run', true);
	xhr.setRequestHeader('Content-Type', 'text/javascript; charset=UTF-8');
	xhr.send(text);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			var script = document.createElement('script');
			script.innerHTML += '(async function Main() {\\n';
			script.innerHTML += 'try {\\n';
			script.innerHTML += '_endgraphics();\\n';
			script.innerHTML += 'await _changedir(\\'${workingDirectory}\\');\\n';
			script.innerHTML += xhr.response + '\\n';
			script.innerHTML += '} catch(err) {\\n';
			script.innerHTML += 'if(err && err.message) console.error(err);\\n';
			script.innerHTML += '}\\n';
			script.innerHTML += '${blitz.endProgram().replace(/'/g, '\\\'')}\\n';
			script.innerHTML += '})();';
			scriptContainer.innerHTML = '';
			scriptContainer.appendChild(script);
		}
	};
}

_eventText.addEventListener('input', () => {
	_eventTextExecute();
});
_eventTextExecute();
</script>`));
	})
	.listen(port, () => {
		return console.log(`${color.fgGreen}[SYSTEM] - Started. Listening to http://localhost:${port}${color.reset}`);
	});

server.timeout = timeoutTimer;
