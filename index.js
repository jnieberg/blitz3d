// @ts-nocheck
/* eslint-env browser, node */
const url = require('url');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const blitz = require('./blitz');
const baseDirectory = __dirname;
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
	<script src="/blitz3d.js"></script>

	<title>Blitz3D - ${requestUrl.pathname.replace(/^\//, '')}</title>
	<style>
	body {
		margin: 0;
		background-color: #468;
		overflow: hidden;
	}

	#blitz, #blitz2 {
		background: black;
		margin: auto;
    position: absolute;
    top: 0;
    bottom: calc(10% + 20px);
    left: 0;
    right: 0;
	}
	#blitzText {
		font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
		font-size: 13px;
		position: absolute;
		width: 30%;
		height: 100%;
		padding: 10px;
		right: 0;
		top: 0;
		border: 0;
	}
	#blitzText + #blitz {
		right: calc(30% + 20px);
	}
	.debug {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #357;
    white-space: pre;
    word-wrap: break-word;
		overflow: auto;
    padding: 10px 15px;
		margin: 0;
    overflow-x: auto;
		height: 10%;
	}
	.debug code {
    font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
    display: block;
    font-size: 13px;
		line-height: 20px;
    color: #ddd;
	}
	#blitzText + #blitz + .debug {
		right: calc(30% + 20px);
	}
	</style>
</head>

<body>
	${body}
</body>
</html>`
}


function parseRequest(req, res) {
	const requestUrl = url.parse(req.url);
	res.writeHead(status.ok, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/html'
	});
	const fileStream = fs.createReadStream(`${baseDirectory}${requestUrl.pathname.replace(/\.js$/, '')}`);
	(function _foo(fStream, resp) {
		let body = '';
		fStream.on('data', (data) => {
			body = body + data;
		});
		fStream.on('end', () => {
			const result = blitz.parseBB(body);
			resp.end(`(async function Main() {
_graphics(400, 300, 32, 1);
try {
	${result}
} catch(err) {
	_debug(err, '#f57');
}
setTimeout(() => {
${blitz.endProgram()}
}, 100);
})();`);
		});
		fStream.on('error', (err) => {
			resp.end();
		});
	}(fileStream, res));
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
			res.end();
		});
	})
	.get('*.bb', (req, res) => {
		const requestUrl = url.parse(req.url);
		res.end(writeHtml(req, `<canvas id="blitz" width="400" height="300"></canvas>
	<pre class="debug"><code></code></pre>
	<script src="${requestUrl.pathname}.js"></script>`));
	})
	.get('/blitz3d.js', (req, res) => {
		res.end(blitz.parseBlitz());
	})
	.get('*.js', (req, res) => {
		parseRequest(req, res);
		res.setTimeout(timeoutTimer, () => {
			res.status(status.notFound).end();
		});
	})
	.get('/', (req, res) => {
		res.end(writeHtml(req, `<textarea id="blitzText">; Your custom code</textarea>
<canvas id="blitz" width="400" height="300"></canvas>
<pre class="debug"><code></code></pre>
<div id="blitzScript"></div>
<script>
var _eventText = document.querySelector('#blitzText');
var _blitzCode = localStorage.getItem('blitz3d-source');
if(_blitzCode) {
	_eventText.value = _blitzCode;
}
function _eventTextExecute() {
	const text = _eventText.value;
	localStorage.setItem('blitz3d-source', text);
	const scriptContainer = document.querySelector('#blitzScript');
	document.querySelector('.debug code').innerHTML = '';
	var xhr = new XMLHttpRequest();
  xhr.open('POST', '/run', true);
	xhr.setRequestHeader('Content-Type', 'text/javascript; charset=UTF-8');
	xhr.send(text);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			try {
				var script = document.createElement('script');
				script.innerHTML += '(async function Main() {\\n';
				script.innerHTML += '_graphics(400, 300, 32, 1);\\n';
				script.innerHTML += 'try {\\n';
				script.innerHTML += xhr.response + '\\n';
				script.innerHTML += '} catch(err) {\\n';
				script.innerHTML += '	_debug(err, \\'#f57\\');\\n';
				script.innerHTML += '}\\n';
				script.innerHTML += 'setTimeout(() => {\\n';
				script.innerHTML += '${blitz.endProgram().replace(/'/g, '\\\'')}\\n';
				script.innerHTML += '}, 100);\\n';
				script.innerHTML += '})();';
				scriptContainer.innerHTML = '';
				scriptContainer.appendChild(script);
			} catch(err) {
				_debug(err, '#f57');
			}
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
		return console.log(`${color.fgGreen}[SYSTEM] - Started.Listening to http://localhost:${port}${color.reset}`);
	});
server.timeout = timeoutTimer;
