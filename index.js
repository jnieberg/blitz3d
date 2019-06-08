// @ts-nocheck
/* eslint-env browser, node */
const url = require('url');
const fs = require('fs');
const net = require('net');
const express = require('express');
const mkdirp = require('mkdirp');
const bodyParser = require('body-parser');
const blitz = require('./blitz');
const baseDirectory = __dirname;
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
	<link rel="stylesheet" type="text/css" href="css/blitz3d.css">
	<title>Blitz3D - ${requestUrl.pathname.replace(/^\//, '')}</title>
</head>

<body>
	${body}
</body>
</html>`
}

function parseRequest(req, res, mime) {
	const requestUrl = url.parse(req.url);
	res.writeHead(status.ok, {
		'Accept-Ranges': 'bytes',
		'Transfer-Encoding': 'chunked',
		'Vary': 'Accept-Encoding',
		'Content-Type': mime
	});
	const fileStream = fs.createReadStream(`${baseDirectory}${requestUrl.pathname}`);
	((fStream, resp) => {
		let body = '';
		if (mime === 'image/png') {
			fStream.setEncoding('binary');
		}
		fStream.on('data', (data) => {
			body = body + data;
		});
		fStream.on('end', () => {
			if (mime === 'image/png') {
				resp.end(body, 'binary');
			}
			resp.end(body);
		});
		fStream.on('error', (err) => {
			resp.status(404).end();
		});
	})(fileStream, res);
}

function parseRequestBB(req, res) {
	const requestUrl = url.parse(req.url);
	res.writeHead(status.ok, {
		'Content-Type': 'application/javascript'
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
_changedir('${workingDirectory}');
${result}
${blitz.endProgram()}
})();`);
		});
		fStream.on('error', (err) => {
			resp.end();
		});
	}(fileStream, res));
}

function getPost(req, callback) {
	streamRaw = '';
	req.on('data', chunk => {
		streamRaw += chunk.toString();
	});
	req.on('end', () => {
		const stream = JSON.parse(streamRaw);
		callback(stream);
	});
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
	.get('/readdir/*', (req, res) => {
		const requestUrl = url.parse(req.url);
		const folder = decodeURI(requestUrl.pathname.split(/^[\/\\].*?[\/\\]/)[1] + '/');
		fs.readdir(folder, (err, files) => {
			const result = [];
			files.forEach(file => {
				let type = 1;
				try {
					if (fs.statSync(folder + file).isDirectory()) {
						type = 2;
					}
					result.push({
						name: file,
						type: type
					});
				} catch (err) { }
			});
			res.end(JSON.stringify(result));
		});
	})
	.get('/filetype/*', (req, res) => {
		const requestUrl = url.parse(req.url);
		const file = decodeURI(requestUrl.pathname.split(/^[\/\\].*?[\/\\]/)[1]);
		try {
			if (fs.statSync(file).isDirectory()) {
				res.end('2');
			} else {
				res.end('1');
			}
		} catch (err) {
			res.status(status.notFound).end('0');
		}
	})
	.get('/openfile/*', (req, res) => {
		const requestUrl = url.parse(req.url);
		const file = decodeURI(requestUrl.pathname.split(/^[\/\\].*?[\/\\]/)[1]);
		try {
			fs.readFile(file, 'utf8', (err, data) => {
				res.end(data);
			});
		} catch (err) {
			res.status(status.notFound).end('');
		}
	})
	.post('/writefile', (req, res) => {
		getPost(req, (stream) => {
			try {
				fs.writeFile(stream.name, stream.data, 'utf8', (err, data) => {
					if (err) throw err;
					res.end(JSON.stringify({
						name: stream.name,
						data: stream.data,
						position: 0,
						readonly: false
					}));
				});
			} catch (err) {
				res.status(status.notFound).end();
			}
		});
	})
	.get('/currentdir', (req, res) => {
		res.end(baseDirectory);
	})
	.post('/changedir', (req, res) => {
		getPost(req, stream => {
			process.chdir(stream.directory);
			res.end();
		});
	})
	.post('/createdir', (req, res) => {
		getPost(req, stream => {
			mkdirp(stream.path, err => {
				if (err) {
					res.status(status.notFound).end();
				} else {
					res.end();
				}
			});
		});
	})
	.post('/deletedir', (req, res) => {
		getPost(req, (stream) => {
			fs.rmdir(stream.path, err => {
				if (err) {
					res.status(status.notFound).end();
				} else {
					res.end();
				}
			});
		});
	})
	.get('/filesize/*', (req, res) => {
		const requestUrl = url.parse(req.url);
		const file = decodeURI(requestUrl.pathname.split(/^[\/\\].*?[\/\\]/)[1]);
		res.end(String(fs.statSync(file).size || 0));
	})
	.post('/copyfile', (req, res) => {
		getPost(req, (stream) => {
			fs.copyFile(stream.from, stream.to, err => {
				if (err) {
					res.status(status.notFound).end();
				} else {
					res.end();
				}
			});
		});
	})
	.post('/deletefile', (req, res) => {
		getPost(req, (stream) => {
			fs.unlink(stream.filename, err => {
				if (err) {
					res.status(status.notFound).end();
				} else {
					res.end();
				}
			});
		});
	})
	.get('/writeline/*', (req, res) => {
		const requestUrl = url.parse(req.url);
		const stream = JSON.parse(decodeURI(requestUrl.pathname.split(/^[\/\\].*?[\/\\]/)[1]));
		const uriSplit = stream.name.split(':'); // location:port
		var body = '';
		var sock = net.connect(uriSplit[1], uriSplit[0], () => {
			sock.write(stream.data.replace(/\/n\b/, '\r\n'));
		});
		sock.on('data', (data) => {
			body += data;
		});
		sock.on('end', () => {
			res.end(JSON.stringify({
				name: stream.name,
				data: body.toString(),
				position: 0,
				readonly: false
			}));
		});
		sock.on('error', (err) => { })
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
	.get('*.js', (req, res) => {
		parseRequestBB(req, res);
		res.setTimeout(timeoutTimer, () => {
			res.status(status.notFound).end();
		});
	})
	.get('*.css', (req, res) => {
		parseRequest(req, res, 'text/css');
	})
	.get('*.png', (req, res) => {
		parseRequest(req, res, 'image/png');
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
			script.innerHTML += '_graphics(400, 300, 32, 1);\\n';
			script.innerHTML += '_changedir('${workingDirectory}');\\n';
			script.innerHTML += xhr.response + '\\n';
			script.innerHTML += 'setTimeout(() => {\\n';
			script.innerHTML += '${blitz.endProgram().replace(/'/g, '\\\'')}\\n';
			script.innerHTML += '}, 100);\\n';
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
		return console.log(`${color.fgGreen}[SYSTEM] - Started.Listening to http://localhost:${port}${color.reset}`);
	});
server.timeout = timeoutTimer;
