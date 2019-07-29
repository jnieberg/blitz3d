const fs = require('fs');
const url = require('url');
const mm = require('music-metadata');
const path = require('path');
const baseDirectory = path.dirname(require.main.filename);
const sharedDirectory = path.normalize(baseDirectory + '\\public');
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
	'.fon': 'application/octet-stream',
	'.ogv': 'application/ogg',
	'.wav': 'audio/mpeg',
	'.mp3': 'audio/mpeg'
};

function parseRequestEnd(requestUrl, res, mime, directory = baseDirectory, referer = '/', sampleRate = null, stat = status.ok) {
	const fileStream = fs.createReadStream(`${directory}${decodeURI(requestUrl.pathname)}`);
	((fStream, resp) => {
		res.writeHead(stat, {
			'Referer': referer,
			'Accept-Ranges': 'bytes',
			'Transfer-Encoding': 'chunked',
			'Vary': 'Accept-Encoding',
			'Content-Type': mime,
			'Sample-Rate': sampleRate
		});
		const isBinary = (mime === 'audio/mpeg' || mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/gif' || mime === 'image/bmp' || mime === 'application/ogg' || mime === 'application/x-font-ttf' || mime === 'application/x-font-woff' || mime === 'application/octet-stream');
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
		const pathname = decodeURI(requestUrl.pathname);
		const ext = pathname.replace(/^.*(?=\.)/, '');
		const mime = mimetype[ext] || 'text/html';
		const referer = req.headers.referrer || req.headers.referer || '/';
		if (mime === 'audio/mpeg') {
			mm.parseFile(`${directory}${pathname}`)
				.then(metadata => {
					parseRequestEnd(requestUrl, res, mime, directory, referer, metadata.format.sampleRate);
				}).catch(() => {
					parseRequestEnd(requestUrl, res, mime, directory, referer, null, status.notFound);
				});
		} else {
			parseRequestEnd(requestUrl, res, mime, directory, referer);
		}
	},
	parseRequestBB: (req, res) => {
		const requestUrl = url.parse(`/public${decodeURI(req.url)}`);
		const pathname = decodeURI(requestUrl.pathname);
		const directory = pathname.replace(/^\/public(.*)\/.*?$/, '$1');
		res.writeHead(status.ok, {
			'Content-Type': 'application/javascript'
		});
		const fileStream = fs.createReadStream(`${baseDirectory}${pathname.replace(/\.js$/, '')}`);
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
await _loadfont('courier', 18, false, false, false);
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