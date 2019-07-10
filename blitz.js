/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');
var path = require('path');
var commandsAsync = ['delay', 'input', 'waitkey', 'waitmouse', 'loopforever', 'readfile', 'closefile', 'writestring', 'openmovie', 'loadsound', 'playsound', 'playmusic', 'channelplaying', 'loadbuffer', 'savebuffer', 'loadimage', 'saveimage', 'loadanimimage'].map((res) => `_${res}`); //'getkey', 'getmouse', 'keyhit', 'keydown', 
var commandsStatic = ['class', 'in', 'of', 'var', 'case', 'select'];
var commandsReturn = ['resizebank', 'freebank', 'closedir', 'closetcpstream', 'closetcpserver', 'writeline', 'writestring', 'writebyte', 'writeint', 'writebytes', 'writefloat', 'writeshort', 'closemovie', 'freesound', 'freeimage', 'freetimer'];
var variableReserved = ['abstract', 'await', 'instanceof', 'super', 'boolean', 'enum', 'int', 'switch', 'break', 'export', 'interface', 'synchronized', 'byte', 'extends', 'let', 'this', 'long', 'throw', 'catch', 'final', 'native', 'throws', 'char', 'finally', 'new', 'transient', 'class', 'float', 'null', 'package', 'try', 'continue', 'private', 'typeof', 'debugger', 'goto', 'protected', 'var', 'public', 'void', 'delete', 'implements', 'volatile', 'import', 'short', 'double', 'in', 'static', 'with', 'alert', 'frames', 'outerHeight', 'all', 'frameRate', 'outerWidth', 'anchor', 'packages', 'anchors', 'getClass', 'pageXOffset', 'area', 'hasOwnProperty', 'pageYOffset', 'Array', 'hidden', 'parent', 'assign', 'history', 'parseFloat', 'blur', 'image', 'parseInt', 'button', 'images', 'password', 'checkbox', 'Infinity', 'pkcs11', 'clearInterval', 'isFinite', 'plugin', 'clearTimeout', 'isNaN', 'prompt', 'clientInformation', 'isPrototypeOf', 'propertyIsEnum', 'close', 'java', 'prototype', 'closed', 'JavaArray', 'radio', 'confirm', 'JavaClass', 'reset', 'constructor', 'JavaObject', 'screenX', 'crypto', 'JavaPackage', 'screenY', 'Date', 'innerHeight', 'scroll', 'decodeURI', 'innerWidth', 'secure', 'decodeURIComponent', 'layer', 'defaultStatus', 'layers', 'self', 'document', 'length', 'setInterval', 'element', 'link', 'setTimeout', 'elements', 'location', 'status', 'embed', 'Math', 'String', 'embeds', 'mimeTypes', 'submit', 'encodeURI', 'name', 'taint', 'encodeURIComponent', 'NaN', 'text', 'escape', 'navigate', 'textarea', 'eval', 'navigator', 'top', 'event', 'Number', 'toString', 'fileUpload', 'Object', 'undefined', 'focus', 'offscreenBuffering', 'unescape', 'form', 'open', 'untaint', 'forms', 'opener', 'valueOf', 'frame', 'option', 'window', 'onbeforeunload', 'ondragdrop', 'onkeyup', 'onmouseover', 'onblur', 'onerror', 'onload', 'onmouseup', 'ondragdrop', 'onfocus', 'onmousedown', 'onreset', 'onclick', 'onkeydown', 'onmousemove', 'onsubmit', 'oncontextmenu', 'onkeypress', 'onmouseout', 'onunload'];
var variableDouble = ['if', 'while', 'for', 'else', 'case', 'default', 'break', 'const', 'new', 'delete', 'true', 'false', 'function', 'return', 'do', 'of', 'async', 'resolve'];
var commands = [];
var commandsFiles = [];
const baseDirectory = path.dirname(require.main.filename);

function traverseDir(dir, files) {
	files = [];
	fs.readdirSync(baseDirectory + '/' + dir).forEach(file => {
		let fullPath = path.join(dir, file);
		if (fs.lstatSync(baseDirectory + '/' + fullPath).isDirectory()) {
			files.push(...traverseDir(fullPath));
		} else {
			files.push(fullPath);
		}
	});
	return files;
}

function readAsyncCommands() {
	const files = traverseDir('requests/commands/');
	commandsAsync.push(...files.map((filename) => filename.replace(/^.*[\\/]([!a-zA-Z0-9$#%]*?)\.js$/g, '_$1').toLowerCase()));
}
readAsyncCommands();

function readCommands() {
	commandsFiles = traverseDir('commands/');
	return commandsFiles.map((filename) => filename.replace(/^.*[\\/]([!a-zA-Z0-9$#%]*?)\.js$/g, '$1').toLowerCase());
}

function printCommands() {
	commands = readCommands();
	return commandsFiles.map((filename) => {
		return fs.readFileSync(baseDirectory + '/' + filename)
	}).join('\n');
}

function printTools() {
	const tools = fs.readdirSync(baseDirectory + '/static/js/');
	return tools.map((filename) => fs.readFileSync(baseDirectory + '/static/js/' + filename)).join('\n');
}

function initialize() {
	return `${printCommands()}
	${printTools()}`;
}

function backupText(body, num, rx) {
	let result = body.match(rx);
	return [body.replace(rx, `xx${num}xx`), result];
}

function restoreText(body, num, arr) {
	let result = body;
	let index = 0;
	while (result.indexOf(`xx${num}xx`) > -1) {
		result = result.replace(`xx${num}xx`, arr[index++]);
	}
	return result;
}

function endProgram() {
	return '_debuglog(\'Program has ended\');';
}

function parseCommands(result) {
	result = result.replace(/\b[a-zA-Z_][a-zA-Z0-9_$]*?\b/gim, (res, a1, a2, a3, a4) => {
		if (commands.indexOf(res) > -1) {
			return `_${res}`;
		}
		return res;
	});

	const comRx = /(\b[a-zA-Z_][a-zA-Z0-9_$]*?\b)(\(.*?\))?( *)([^=\r\n]*?) *;/gim;
	let comWhile = 0;
	while (comWhile < 10) {
		result = result.replace(comRx, (res, a1, a2, a3, a4) => {
			a1 = a1;
			a2 = a2 || '';
			if (a1.search(/^_[a-z]/) === 0) {
				if (a2) {
					return `${a1}${a2}${a3}${a4};`;
				}
				return `${a1}(${a4});`;
			}
			return `0${a1}${a2}${a3}${a4};`;
		});
		comWhile += 1;
	}
	result = result.replace(/\(\b0([a-zA-Z][a-zA-Z0-9_$]*?)\b( *)\b([_a-zA-Z][a-zA-Z0-9_$#%]*?)\b/gim, (res, a1, a2, a3) => {
		if (commandsStatic.indexOf(a3.replace(/^0/, '')) === -1) {
			return `(${a1},${a2}${a3}`;
		}
		return `(${a1}${a2}${a3}`;
	});
	result = result.replace(/\b0([a-zA-Z_][a-zA-Z0-9_$]*?)\b/gim, '$1');
	let brackWhile = 0;
	while (brackWhile < 10) {
		result = result.replace(/\(\((.*?)\)\)/gim, '($1)');
		brackWhile += 1;
	}
	result = result.replace(/\b_([a-z0-9_$]*?\b) *\( *(\b[^,\r\n]*\b) *(,? *?)(.*) *\);/gim, (res, a1, a2, a3, a4) => {
		if (commandsReturn.indexOf(a1) > -1) {
			return `${a2} = _${a1}(${a2}${a3}${a4});`;
		}
		return res;
	});
	return result;
}

function parsePrimitives(result, sign, obj) {
	const rxNewA = new RegExp(`^(\\b[a-zA-Z0-9_\\.]+?)${sign} *= *(.*?);`, 'gm');
	result = result.replace(rxNewA, `$1${sign} = new ${obj}($2);`);
	if (sign === '#') {
		result = result.replace(/(\-?[0-9]*\.[0-9]+)([\+\-\*\/])*(\-?[0-9]*\.[0-9]+)/gm, `new ${obj}($1$2$3)`);
	}
	const rxList = new RegExp(`(\\b[a-zA-Z0-9_\\.]+?)${sign}`, 'gm');
	result = result.replace(rxList, '$1');
	return result;
}

function parsePart(part) {
	let result = part;
	let quotes = null;
	let comments = null;

	result = result.replace(/;(.*?)/gm, '//$1');
	[result, quotes] = backupText(result, 1, /".*?"/gm);
	[result, comments] = backupText(result, 2, / *\/\/(.*?)$/gm);
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');
	result = result.replace(/\bif *(.+?) *then *(.+?) *$/gim, 'if $1 then\n$2\nend if\n');
	result = result.replace(/\bif *(.+?) *$/gim, (res, a1) => {
		if (a1.toLowerCase().indexOf('then') === -1) {
			const parts = a1.match(/((not) *[^\n ]*?|[^\n ]*? *(,|=|<|>|and|or|xor) *[^\n ]*?|[^\n ])+/gi) || [];
			if (parts.length > 1) {
				const condition = parts[0];
				parts.shift();
				return `if ${condition} then\n${parts.join(' ')}\nend if`;
			}
		}
		return res;
	});
	result = result.replace(/^(.+?) *\belse\b *(.+?)$/gim, '$1\nelse\n$2\n');
	result = result.replace(/\bnot *(\b[a-zA-Z0-9_$#%\(\)]+\b)/gim, '!$1');

	result = result.toLowerCase();
	result = result.replace(/ *: */gm, '\n');
	result = result.replace(/^(?!xx2xx)(.+)$/gm, '$1;');
	result = result.replace(/xx2xx *;/gm, ';xx2xx');
	result = result.replace(/(\b[a-zA-Z0-9_]+?)[\$\%]/gm, '$1');

	result = parseCommands(result);

	result = result.replace(/(\b[a-z][a-zA-Z0-9_$#%]*?\b)/gim, (result, a1) => {
		if (variableReserved.indexOf(a1) > -1) {
			return `${a1}_1`;
		}
		return a1;
	});
	result = result.replace(/^if *(.*?) *(?:then)?;/gim, 'if($1) {');
	result = result.replace(/^else *if *(.*?) *(?:then)?;/gim, '} else if($1) {');
	result = result.replace(/^else.*?;?/gim, '} else {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *\-(.*?);/gim, 'for(var $1=$2,_len_$1=$3; $1<=_len_$1; $1=$1-$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *(.*?);/gim, 'for(var $1=$2,_len_$1=$3; $1<=_len_$1; $1=$1+$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?);/gim, 'for(var $1=$2,_len_$1=$3; $1<=_len_$1; $1+=1) {');
	result = result.replace(/^for *(.*?)\.(.*?) *= *_each(.*?);/gim, 'for($1 of _each($3)) {');

	result = result.replace(/<>/gim, '!=');
	result = result.replace(/^while *(.*?);/gim, 'while(await _async() && $1) {');
	result = result.replace(/^goto\((.*?)\);([\w\W]*?)\.\1;/gm, '$1: {\nbreak $1;\n$2}');
	result = result.replace(/^\.(.+?);/gm, '$1:');

	const dimGetRx = [];
	const dimSetRx = [];
	result = result.replace(/^dim ([a-zA-Z0-9]+?)[$#%]? *\((.+?)\);/gim, (state, m1, m2) => {
		dimGetRx.push(new RegExp(`(\\b${m1}\\b) *\\(`, 'gm'));
		dimSetRx.push(new RegExp(`^(\\b${m1}\\b) *\\((.*)\\) *(?==)`, 'gm'));
		return `var ${m1}=new Dim(${m2});`;
	});
	for (const dimRx of dimSetRx) {
		result = result.replace(dimRx, (res, m1, m2) => {
			const m2new = m2.replace(/, *(?![^()]*(?:\([^()]*\))?\))/g, '][');
			return `${m1}._array[${m2new}]`;
		});
	}
	for (const dimRx of dimGetRx) {
		result = result.replace(dimRx, '$1._get(');
	}

	result = result.replace(/(\b[a-z][a-zA-Z0-9$#%]*?)\.([a-z][a-zA-Z0-9$#%]*?\b)/gim, '$1');
	result = result.replace(/(\b[a-z][a-zA-Z0-9$#%]*?\b)\\(\b[a-z][a-zA-Z0-9$#%]*?\b)/gim, '$1.$2');
	//result = result.replace(/\breturn\b *(.*?);/gim, 'return new Promise(resolve => {\nresolve($1);\n});');
	//result = result.replace(/^end function;/gim, 'return new Promise(resolve => {\nresolve();\n});\n}');
	result = result.replace(/^end;/gim, 'throw new Error();');
	result = result.replace(/^(wend|next);/gim, '}');
	result = result.replace(/^end *.*?;/gim, '}');
	result = result.replace(/%([01]+?\b)/gm, 'parseInt(\'$1\', 2) - 4294967296');
	result = result.replace(/\$([a-zA-Z0-9$#%]+)/gim, '\'#$1\'');
	result = result.replace(/\band\b/gim, ' && ');
	result = result.replace(/\bor\b/gim, ' || ');
	result = result.replace(/ *\^ */gim, ' ** ');
	result = result.replace(/\bxor\b/gim, ' ^ ');
	result = result.replace(/\bmod\b/gim, ' % ');
	result = result.replace(/\bshl\b/gim, ' << ');
	result = result.replace(/\bshr\b/gim, ' >> ');
	result = result.replace(/\bsar\b/gim, ' >>> ');
	result = result.replace(/\bfield\b *(.+?);/gim, (res, a1) => {
		return `field ${a1.replace(/(.*?), */gi, '$1;\nfield ')};`;
	});
	const commandsMap = {
		select: 'switch($1) {',
		case: 'break;\ncase $1:',
		repeat: 'do {',
		forever: '} while(await _async());',
		default: 'break;\ndefault:',
		global: 'var $1;',
		local: 'let $1;',
		type: 'class $1 {',
		field: '$1 = 0;',
		until: '} while(await _async() && !($1));',
		goto: '',
		exit: 'break;'
	};
	for (const c in commandsMap) {
		if (c && commandsMap[c]) {
			const commandRx = new RegExp(' *\\b' + c + '\\b *\\(?([^\\n\\;]*)\\)?;?', 'gim'); //^\\(\\)
			result = result.replace(commandRx, commandsMap[c]);
		}
	}
	result = result.replace(/\b(if|while)\b\((.*?)\)( *[{;])/gim, (state, m1, m2, m3) => {
		return `${m1}(${m2.replace(/([^<>\n])=([^<>\n])/g, '$1==$2')})${m3}`;
	});
	result = result.replace(/^switch([\w\W]*?)break;/gim, 'switch$1');
	result = result.replace(/\bcase\b *(.+?):/gim, (res, a1) => {
		return `case ${a1.replace(/(.*?), */gi, '$1:\ncase ')}:`;
	});

	result = parsePrimitives(result, '#', 'Float');
	//result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)% *= *(.*?);/gm, '$1 = ($2 + _BYTE_MAX) % _BYTE_MAX;');
	result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)%/gm, '$1');

	result = result.replace(/^function *(.*?);/gim, 'async function $1 {');
	result = result.replace(/(\b[a-z_][a-zA-Z0-9_$#%]*\b) *(?!\()(.+?);/gm, (com, a1, a2) => {
		const resultRx = new RegExp(`async *function *${a1} *\\(`, 'i')
		if (result.search(resultRx) > -1 || commandsAsync.indexOf(a1) > -1) {
			return `${a1}(${a2});`;
		}
		return com;
	});
	result = result.replace(/(\b[a-z_][a-zA-Z0-9_$#%]*\b)\(/gm, (com, a1) => {
		const resultRx = new RegExp(`async *function *${a1} *\\(`, 'i')
		if (result.search(resultRx) > -1 || commandsAsync.indexOf(a1) > -1) {
			return `await ${a1}(`;
		}
		return com;
	});
	let varList = [];
	result = result.replace(/(\b[a-z][a-zA-Z0-9_$#%]+?\b)(?! *\()/gm, (res, a1) => {
		if (variableReserved.indexOf(a1) === -1 && variableDouble.indexOf(a1) === -1 && !a1.startsWith('xx') && !a1.startsWith('_') && result.indexOf(`class ${a1} {`) === -1) {
			varList.push(`var ${a1} = 0;`);
		}
		return res;
	});
	varList = varList.filter((item, pos) => varList.indexOf(item) === pos);
	result = varList.join('\n') + '\n' + result;

	result = result.replace(/\bfunction await */gm, 'function ');
	result = result.replace(/\bresolve\(await +/gm, 'resolve(');

	result = restoreText(result, 2, comments);
	result = restoreText(result, 1, quotes);
	result = result.replace(/([^\\])\\(?!\\)/gm, '$1\\\\');
	return result;
}

module.exports = {
	parseBlitz: () => {
		return initialize();
	},
	parseBB: (bb) => {
		return parsePart(bb);
	},
	endProgram: () => {
		return endProgram();
	}
};
