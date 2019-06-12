const fs = require('fs');
const url = require('url');
const baseDirectory = process.cwd();
const workingDirectory = baseDirectory.replace(/\\/g, '/');
const blitz = require('../blitz');
const status = {
	ok: 200,
	badRequest: 400,
	forbidden: 403,
	notFound: 404
};

module.exports = {
	parseRequest: (req, res, mime) => {
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
				resp.end(`(async function Main() {
try {
_graphics(400, 300, 32, 1);
await _changedir('${workingDirectory}');
${result}
} catch(err) {
console.log(err.message);
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