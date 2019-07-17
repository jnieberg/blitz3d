const fs = require('fs');
const url = require('url');
const mm = require('music-metadata');
const path = require('path');
const baseDirectory = path.dirname(require.main.filename);
const sharedDirectory = path.normalize(baseDirectory + '\\shared');
const blitz = require('../blitz');
const status = {
	ok: 200,
	badRequest: 400,
	forbidden: 403,
	notFound: 404
};
var mimetype = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.txt': 'text/plain',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
	'.bmp': 'image/bmp',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.ttf': 'application/x-font-ttf',
	'.woff': 'application/x-font-woff',
	'.woff2': 'text/plain',
	'.ogv': 'application/ogg',
	'.wav': 'audio/mpeg'
};

function parseRequestEnd(requestUrl, res, mime, directory = baseDirectory, sampleRate = null, stat = status.ok) {
	const fileStream = fs.createReadStream(`${directory}${requestUrl.pathname}`);
	((fStream, resp) => {
		res.writeHead(stat, {
			'Accept-Ranges': 'bytes',
			'Transfer-Encoding': 'chunked',
			'Vary': 'Accept-Encoding',
			'Content-Type': mime,
			'Sample-Rate': sampleRate
		});
		const isBinary = (mime === 'audio/mpeg' || mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/gif' || mime === 'image/bmp' || mime === 'application/ogg');
		let body = '';

		if (isBinary) {
			fStream.setEncoding('binary');
		}
		fStream.on('data', (data) => {
			body = body + data;
		});
		fStream.on('end', () => {
			if (isBinary) {
				resp.end(body, 'binary');
			}
			resp.end(body);
		});
		fStream.on('error', (err) => {
			resp.status(status.notFound).end();
		});
	})(fileStream, res);
}

module.exports = {
	parseRequest: (req, res, isBaseDirectory = true) => {
		const directory = isBaseDirectory ? baseDirectory : sharedDirectory;
		const requestUrl = url.parse(req.url);
		const ext = requestUrl.pathname.replace(/^.*(?=\.)/, '');
		const mime = mimetype[ext] || 'text/html';
		if (mime === 'audio/mpeg') {
			mm.parseFile(`${directory}${requestUrl.pathname}`)
				.then(metadata => {
					parseRequestEnd(requestUrl, res, mime, directory, metadata.format.sampleRate);
				}).catch(() => {
					parseRequestEnd(requestUrl, res, mime, directory, null, status.notFound);
				});
		} else {
			parseRequestEnd(requestUrl, res, mime, directory);
		}
	},
	parseRequestBB: (req, res) => {
		const requestUrl = url.parse(`/shared${req.url}`);
		const directory = requestUrl.pathname.replace(/^\/shared(\/.*)\/.*?$/, '$1');
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
				process.chdir(path.dirname(require.main.filename));
				const result = blitz.parseBB(body, directory);
				resp.end(`(async () => {
try {
_endgraphics();
await _changedir('${directory}');
${result}
} catch(err) {
if(err && err.message) _errorlog(err, true);
}
${blitz.endProgram()}
})();`);
			});
			fStream.on('error', (err) => {
				resp.end();
			});
		}(fileStream, res));
	}
}