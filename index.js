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

function parseRequest(req, res) {
	const requestUrl = url.parse(req.url);
	res.writeHead(status.ok, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/html'
	});
	const fileStream = fs.createReadStream(`${baseDirectory}${requestUrl.pathname}`);
	(function bar(fStream, resp) {
		let body = '';
		fStream.on('data', (data) => {
			body = body + data;
		});
		fStream.on('end', () => {
			const result = blitz.parseBlitz(body);
			resp.end(`<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Blitz 3D</title>
	<style>
	body {
		margin: 0;
	}

	#blitz {
		background: black;
		margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	}
	</style>
</head>

<body>
</body>
<script>
${result}
</script>
</html>`);
		});
		fStream.on('error', () => {
			resp.end();
		});
	}(fileStream, res));
}

const server = app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.get('*.bb', (req, res) => {
		parseRequest(req, res);
		res.setTimeout(timeoutTimer, () => {
			res.status(status.notFound).end();
		});
	})
	.listen(port, () => {
		return console.log(`${color.fgGreen}[SYSTEM] - Started.Listening to http://localhost:${port}${color.reset}`);
	});
server.timeout = timeoutTimer;
