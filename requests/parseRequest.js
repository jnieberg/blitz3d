const fs = require('fs');
const url = require('url');
const mm = require('music-metadata');
const util = require('util');
const baseDirectory = process.cwd();
const workingDirectory = baseDirectory.replace(/\\/g, '/');
const blitz = require('../blitz');
const status = {
	ok: 200,
	badRequest: 400,
	forbidden: 403,
	notFound: 404
};

function parseRequestEnd(requestUrl, res, mime, sampleRate = null, stat = status.ok) {
	const fileStream = fs.createReadStream(`${baseDirectory}${requestUrl.pathname}`);
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
	parseRequest: (req, res, mime) => {
		const requestUrl = url.parse(req.url);
		if (mime === 'audio/mpeg') {
			mm.parseFile(`${baseDirectory}${requestUrl.pathname}`)
				.then(metadata => {
					parseRequestEnd(requestUrl, res, mime, metadata.format.sampleRate);
				}).catch(() => {
					parseRequestEnd(requestUrl, res, mime, null, status.notFound);
				});
		} else {
			parseRequestEnd(requestUrl, res, mime);
		}
	},
	parseRequestBB: (req, res) => {
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
				resp.end(`(async () => {
try {
_endgraphics();
await _changedir('${workingDirectory}');
${result}
} catch(err) {
if(err && err.message) console.error(err);
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