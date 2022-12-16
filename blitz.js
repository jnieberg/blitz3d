/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js;
var commandsAsync = ['delay', 'input', 'waitkey', 'waitmouse', 'loopforever', 'loadfont', 'setfont', 'readfile', 'closefile', 'writebyte', 'writefloat', 'writeint', 'writeline', 'writeshort', 'writestring', 'openmovie', 'loadsound', 'playsound', 'playmusic', 'loadbuffer', 'savebuffer', 'loadimage', 'saveimage', 'loadanimimage', 'writebytes'].map((res) => `_${res}`); //'getkey', 'getmouse', 'keyhit', 'keydown', 
var commandsStatic = ['class', 'in', 'of', 'var', 'case', 'select'];
var commandsReturn = ['read', 'resizebank', 'freebank', 'closedir', 'closetcpstream', 'closetcpserver', 'writeline', 'writestring', 'writebyte', 'writeint', 'writefloat', 'writeshort', 'closemovie', 'freesound', 'freeimage', 'freetimer'];
var variableReserved = ['abstract', 'await', 'instanceof', 'super', 'boolean', 'enum', 'int', 'switch', 'break', 'export', 'interface', 'synchronized', 'byte', 'extends', 'let', 'this', 'long', 'throw', 'catch', 'final', 'native', 'throws', 'char', 'finally', 'new', 'transient', 'class', 'float', 'package', 'try', 'continue', 'private', 'typeof', 'debugger', 'protected', 'var', 'public', 'void', 'delete', 'implements', 'volatile', 'import', 'short', 'double', 'in', 'static', 'with', 'alert', 'frames', 'outerHeight', 'all', 'frameRate', 'outerWidth', 'anchor', 'packages', 'anchors', 'getClass', 'pageXOffset', 'area', 'hasOwnProperty', 'pageYOffset', 'Array', 'hidden', 'parent', 'assign', 'history', 'parseFloat', 'blur', 'image', 'parseInt', 'button', 'images', 'password', 'checkbox', 'Infinity', 'pkcs11', 'clearInterval', 'isFinite', 'plugin', 'clearTimeout', 'isNaN', 'prompt', 'clientInformation', 'isPrototypeOf', 'propertyIsEnum', 'close', 'java', 'prototype', 'closed', 'JavaArray', 'radio', 'confirm', 'JavaClass', 'reset', 'constructor', 'JavaObject', 'screenX', 'crypto', 'JavaPackage', 'screenY', 'Date', 'innerHeight', 'scroll', 'decodeURI', 'innerWidth', 'secure', 'decodeURIComponent', 'layer', 'defaultStatus', 'layers', 'self', 'document', 'length', 'setInterval', 'element', 'link', 'setTimeout', 'elements', 'location', 'status', 'embed', 'Math', 'String', 'embeds', 'mimeTypes', 'submit', 'encodeURI', 'name', 'taint', 'encodeURIComponent', 'NaN', 'text', 'escape', 'navigate', 'textarea', 'eval', 'navigator', 'top', 'event', 'Number', 'toString', 'fileUpload', 'Object', 'undefined', 'focus', 'offscreenBuffering', 'unescape', 'form', 'open', 'untaint', 'forms', 'opener', 'valueOf', 'frame', 'option', 'window', 'onbeforeunload', 'ondragdrop', 'onkeyup', 'onmouseover', 'onblur', 'onerror', 'onload', 'onmouseup', 'ondragdrop', 'onfocus', 'onmousedown', 'onreset', 'onclick', 'onkeydown', 'onmousemove', 'onsubmit', 'oncontextmenu', 'onkeypress', 'onmouseout', 'onunload'];
var variableDouble = ['if', 'while', 'for', 'else', 'then', 'case', 'default', 'break', 'const', 'new', 'delete', 'true', 'false', 'function', 'return', 'do', 'of', 'async', 'resolve', 'global', 'dim', 'local', 'end', 'repeat', 'elseif', 'endif', 'wend', 'exit', 'until', 'select', 'next', 'forever', 'goto', 'stop', 'null', 'and'];
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
		return fs.readFileSync(baseDirectory + '/' + filename);
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
	result = result.replace(/(\b[a-zA-Z_][a-zA-Z0-9_$]*?\b)[$#%]?/gim, (res, a1, a2, a3, a4) => {
		if (commands.indexOf(a1) > -1) {
			return `_${a1}`;
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
		result = result.replace(/\(\(([^()\n]*?)\)\)/gim, '($1)');
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

function parsePart(part, directory) {
	let result = part;
	let quotes = null;
	let comments = null;
	let js = null;

	result = result.replace(/include *"(.*?)"/gim, (res, a1) => {
		try {
			return fs.readFileSync(`${process.cwd()}/public${directory}/${a1}`);
		} catch (err) {
			return '';
		}
	});
	[result, quotes] = backupText(result, 1, /".*?"/gm);

	[result, js] = backupText(result, 3, /;;.*$/gm);
	result = result.replace(/ *;(.*)$/gm, '//$1');
	[result, comments] = backupText(result, 2, / *\/\/(.*?)$/gm);
	result = result.replace(/[\t ]+/gm, ' ');
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');

	let ifWhile = 0;
	while (ifWhile < 10) {
		result = result.replace(/\bif *(.+?) *then *(.+?) *$/gim, 'if $1 then\n$2\nend if\n');
		ifWhile++
	}

	result = result.replace(/\bif *(.+?) *$/gim, (res, a1) => {
		if (a1.toLowerCase().indexOf('then') === -1) {
			const parts = a1.match(/((not) *[^\n ]*?| *[^\n ]*? *(,|=|<|>|and|or|xor|mod|shr|shl|sar) *[^\n ]*? +|[^\n ])+/gi) || [];
			if (parts.length > 1 && parts[1] !== 'xx2xx') {
				const condition = parts[0];
				parts.shift();
				return `if ${condition} then\n${parts.join(' ')}\nend if`;
			}
		}
		return res;
	});
	result = result.replace(/^(.+?) *\belse\b *(.+?)$/gim, '$1\nelse\n$2\n');

	result = result.toLowerCase();
	result = result.replace(/\bcase +([^:\n]*?) +/gm, 'case $1:');
	result = result.replace(/ *: */gm, '\n');
	result = result.replace(/^(?!xx2xx) *(.+) *$/gm, '$1;');
	result = result.replace(/ *xx2xx *;/gm, ';xx2xx');
	result = result.replace(/(\b[a-zA-Z0-9_]+?)[\%\$]/gm, '$1');
	//result = result.replace(/(\b[a-zA-Z0-9_]+?)\$/gm, '$1xxsxx');

	result = parseCommands(result);

	result = result.replace(/(\b[a-z][a-zA-Z0-9_$#%]*?\b)/gim, (res, a1) => {
		if (variableReserved.indexOf(a1) > -1) {
			return `${a1}_1`;
		}
		return a1;
	});

	result = result.replace(/\bfunction *(.*?) *\((.*?)\);([\w\W]*?)\bend function/gim, (res, a1, a2, a3) => {
		const varListEx = (a2.replace(/[ $#%]*/gim, '').replace(/(\b[a-z][a-zA-Z0-9_]*?) *=.*?(,|$)/gim, '$1$2')).split(',');
		let varList = [];
		a3 = a3.replace(/^.*?(\b[a-z][a-zA-Z0-9_$#%]*?\b)(?! *\()/gm, (res, a4) => {
			const variable = `${a4}`;
			// if (a1 === 'filegetindex') {
			// 	console.log(a4, varListEx.indexOf(a4));
			// }
			const constRx = new RegExp(`const *.*\\b${a4}\\b`, 'gim');
			const globalRx = new RegExp(`global *.*\\b${a4}\\b`, 'gim');
			const functionRx = new RegExp(`function *\\b${a4}\\b`, 'gim');
			const typeRx = new RegExp(`type *\\b${a4}\\b`, 'gim');
			if (varList.indexOf(variable) === -1 && variableReserved.indexOf(a4) === -1 && variableDouble.indexOf(a4) === -1 && !a4.startsWith('xx') && !a4.startsWith('_') && result.search(typeRx) === -1 && result.search(functionRx) === -1 && result.search(constRx) === -1 && result.search(globalRx) === -1 && varListEx.indexOf(a4) === -1) {
				varList.push(variable);
			}
			return res;
		});
		console.log(varList);
		const varDecl = varList.map(res => `var ${res} = 0;`).join('\n');
		return `function ${a1}(${a2});\n${varDecl}${a3}end function;`;
	});
	//result = result.replace(/^end function;/gim, 'return new Promise(resolve => {\nresolve(false);\n});\n}');
	result = result.replace(/^if *(.*?) *(?:then)?;/gim, 'if($1) {');
	result = result.replace(/^else *if *(.*?) *(?:then)?;/gim, '} else if($1) {');
	result = result.replace(/^else.*?;?/gim, '} else {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *\-(.*?);/gim, 'for(var $1=$2, _len_$1=$3; $1>=_len_$1; $1=$1-$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *(.*?);/gim, 'for(var $1=$2, _len_$1=$3; $1<=_len_$1; $1=$1+$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?);/gim, 'for(var $1=$2, _len_$1=$3; $1<=_len_$1; $1+=1) {');
	result = result.replace(/^for *(.*?)\.(.*?) *= *_each(.*?);/gim, 'for($1 of _each($3)) {');

	result = result.replace(/<>/gim, '!=');
	result = result.replace(/^while *(.*?);/gim, 'while(await _async() & $1) {');
	result = result.replace(/^goto\((.*?)\);([\w\W]*?)\.\1;/gm, '$1: {\nbreak $1;\n$2}');
	//result = result.replace(/^\.(.+?);/gm, '$1:');
	result = result.replace(/(\b[a-z][a-zA-Z0-9$#%]*?)\.([a-z][a-zA-Z0-9$#%]*?\b)/gim, '$1');
	result = result.replace(/(.*?)\\(\b[a-z][a-zA-Z0-9$#%_]*?\b)/gim, '$1.$2');

	const dimGetRx = [];
	const dimSetRx = [];
	result = result.replace(/^dim ([a-zA-Z0-9_]+?)[$#%]? *\((.+?)\);/gim, (state, m1, m2) => {
		dimGetRx.push(new RegExp(`(\\b${m1}\\b) *\\(`, 'gm'));
		dimSetRx.push(new RegExp(`^(\\b${m1}\\b) *\\((.*)\\)(.*?) *(?==)`, 'gm'));
		return `var ${m1} = new _Dim(${m2});`;
	});
	for (const dimRx of dimSetRx) {
		result = result.replace(dimRx, (res, m1, m2, m3) => {
			let m2new = '[' + m2.replace(/, *(?![^()]*(?:\([^()]*\))?\))/g, '][') + ']';
			m2new = m2new.replace(/\[ *([^0-9].*?) *\]/g, '[Math.floor($1)]');
			return `${m1}._array${m2new}${m3}`;
		});
	}
	for (const dimRx of dimGetRx) {
		result = result.replace(dimRx, '$1._get(');
	}

	result = result.replace(/^(end|stop);/gim, 'throw new Error();');
	result = result.replace(/^(wend|next);/gim, '}');
	result = result.replace(/^end *.*?;/gim, '}');
	result = result.replace(/%([01]+)/gm, 'parseInt(\'$1\', 2) - 4294967296');
	result = result.replace(/\$([A-F0-9]+)/gim, '(0x$1 shr 0x100)');
	result = result.replace(/\band\b/gim, ' & ');
	result = result.replace(/\bor\b/gim, ' | ');
	result = result.replace(/ *\^ */gim, ' ** ');
	result = result.replace(/\bxor\b/gim, ' ^ ');
	result = result.replace(/\bmod\b/gim, ' % ');
	result = result.replace(/\bshl\b/gim, ' << ');
	result = result.replace(/\bshr\b/gim, ' >> ');
	result = result.replace(/\bsar\b/gim, ' >>> ');
	// result = result.replace(/\b(field|global|local|const)\b *([a-z][a-z0-9_]*?);/gim, (res, a1, a2) => {
	// 	return `${a1} ${a2.replace(/(.*?), */gi, '$1;\n' + a1 + ' ')}; `;
	// });
	result = result.replace(/\b(field)\b *(.*);/gim, (res, a1, a2) => {
		return `${a1} ${a2.replace(/(.*?), */gi, '$1;\n' + a1 + ' ')}; `;
	});
	result = result.replace(/\b(field|global|local|const)\b *([a-z][a-z0-9_]*?)(?: *= *(.+?));/gim, '$1 $2 = $3;');
	result = result.replace(/\b(field|global|local|const)\b *([^=\n\[\]]+?)\[(.*)\];/gim, (res, a1, a2, a3) => {
		return `${a2} = new _Dim(${a3.split(/\]\[/g).join(', ')})`;
	});
	result = result.replace(/\b(field|global|local|const)\b *([^=\n\[\]]+?);/gim, '$1 $2 = 0;');

	const commandsMap = {
		select: 'switch($1) {',
		case: 'break;\ncase $1:',
		repeat: 'do {',
		forever: '} while(await _async());',
		default: 'break;\ndefault:',
		const: 'var $1;',
		global: 'var $1;',
		local: '$1;',
		type: 'class $1 {',
		until: '} while(await _async() & _not($1));',
		field: '$1;',
		exit: 'break;'
	};
	for (const c in commandsMap) {
		if (c && commandsMap[c]) {
			const commandRx = new RegExp(' *\\b' + c + '\\b *\\((.*)\\);', 'gim'); //^\\(\\)
			const commandRx2 = new RegExp(' *\\b' + c + '\\b *(.*);', 'gim'); //^\\(\\)
			result = result.replace(commandRx, commandsMap[c]);
			result = result.replace(commandRx2, commandsMap[c]);
		}
	}
	result = result.replace(/(\bif\b|\bwhile\b|\breturn\b|^[a-z][a-z0-9_]*? *=) *(?:\((.*?)\)|(.*?))( *[{;])/gim, (state, m1, m2 = '', m3 = '', m4) => {
		if (m2 + m3 === '') {
			return m1 + m4;
		}
		return `${m1} (${(m2 + m3).replace(/([^<>+\-\n]) *([=]) *(?![<>+\n])/gim, '$1$2$2')})${m4}`;
	});
	result = result.replace(/^switch([\w\W]*?)break;/gim, 'switch$1');
	result = result.replace(/\bcase\b *(.+)[:\n]/gim, (res, a1) => {
		return `case ${a1.replace(/(.*?), */gi, '$1:\ncase ')}: `;
	});
	let notWhile = 0;
	while (notWhile < 10) {
		result = result.replace(/\b_not *([^\()].*?) *([;{])/gim, '_not($1)$2');
		notWhile++
	}
	result = result.replace(/ *\bthen\b */gim, '');
	result = parsePrimitives(result, '#', '_Float');
	//result = parsePrimitives(result, 'xxsxx', '_String');
	//result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)% *= *(.*?);/gm, '$1 = ($2 + _BYTE_MAX) % _BYTE_MAX;');
	result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)%/gm, '$1');

	result = result.replace(/^function *(\b[a-z][a-z0-9_]*\b\(.*?\));/gim, 'async function $1 {');
	result = result.replace(/(\b[a-z][a-z0-9_]*\b) *(?!\()(.+?);/gm, (com, a1, a2) => {
		const resultRx = new RegExp(`async +function +${a1}\\b *\\(`, 'i')
		if (result.search(resultRx) > -1 || commandsAsync.indexOf(a1) > -1) {
			return `${a1} (${a2});`;
		}
		return com;
	});
	result = result.replace(/(\b_?[a-z][a-z0-9_]*\b) *\(/gm, (com, a1) => {
		const resultRx = new RegExp(`async +function +${a1}\\b *\\(`, 'i')
		if (result.search(resultRx) > -1 || commandsAsync.indexOf(a1) > -1) {
			return `await ${a1} (`;
		}
		return com;
	});
	let varList = [];
	result = result.replace(/(\b[a-z][a-zA-Z0-9_$#%]*?\b)(?! *\()/gm, (res, a1) => {
		const varRx = new RegExp(`var +${a1}\\b`);
		if (result.search(varRx) === -1 && varList.indexOf(`var ${a1};`) === -1 && variableReserved.indexOf(a1) === -1 && variableDouble.indexOf(a1) === -1 && !a1.startsWith('xx') && !a1.startsWith('_') && result.indexOf(`class ${a1} {`) === -1) { //
			varList.push(`var ${a1};`);
			//return `var ${a1};\n${res}`;
		}
		return res;
	});
	result = varList.join('\n') + result;

	result = result.replace(/\bfunction await *([a-z][a-z0-9_]*) *\((.*)\)/gm, (res, a1, a2) => {
		//a2 = a2.replace(/(, *\b[a-z][a-zA-Z0-9_$#%]*?\b)(?! *=)/gim, '$1 = new _Obj()');
		return `function ${a1} (${a2})`;
	});
	//result = result.replace(/\breturn\b *(.*?);/gim, 'return new Promise(resolve => {\nresolve($1);\n});');
	result = result.replace(/\bresolve(\(+)await +/gim, 'resolve$1');

	result = result.replace(/\b_read *\(([a-z][a-z0-9_]*)\);/gim, '_read();');
	result = result.replace(/\b_restore *\(([a-z][a-z0-9_]*)\);/gim, '_restore("$1");');

	//linesSplit = result.replace(/(\r\n)+/gm, '$1').split(/\r\n/gm).map((res, index) => `case ${index + 1}: ${res}`);
	result = `var _goto = "";
while(await _async()) {
	switch(_goto) {
		case "":
		${result}
		throw new Error();
	}
}`;

	result = restoreText(result, 2, comments);
	//console.log(result.match(/^goto\b.*$/gim))
	result = restoreText(result, 3, js).replace(/;;/gm, '');
	result = restoreText(result, 1, quotes);
	//console.log(quotes.join(' | '));
	result = result.replace(/goto *(\b[a-z][a-z0-9_]*\b);/gim, '_goto = "$1"; break;')
	const dataListSearch = (result.match(/^\.\b[a-z][a-z0-9_]*\b/gim) || []);//.filter(res => res !== 'xx1xx' && res !== 'xx3xx' && res !== 'default');
	for (let d = dataListSearch.length - 1; d >= 0; d--) {
		const dataResRx = new RegExp(`([\\w\\W]*) *(${dataListSearch[d].replace(/\./g, '\\.')})\\b; *([\\w\\W]*)`, 'gim');
		result = result.replace(dataResRx, (res, a1, a2, a3) => {
			a2 = a2.substring(1);
			const ret = `_data("${a2}"`;
			let m2 = a3.match(/(\bdata *(.*?);)/gim) || [];
			m2 = m2.map(res2 => res2.replace(/^data *|;$/g, '').split(/ *, */)).reduce((acc, val) => acc.concat(val), []).join(',');
			const m3 = `${a1}${a3.replace(/(\bdata *(.*?);)/gim, '')}`; //case "${a2}"
			if (m2) {
				return `${ret}, [${m2}]);
${m3}`
			}
			return m3;
		});
	}
	result = result.replace(/^\.(\b[a-z][a-z0-9_]*\b);/gim, '$1:');

	result = result.replace(/\\/gm, '\\\\');

	result = result.replace(/(\r\n)+/gm, '$1');
	try {
		result = beautify(result);
	} catch (err) {
	}
	return result;
}

module.exports = {
	parseBlitz: () => {
		return initialize();
	},
	parseBB: (bb, directory) => {
		return parsePart(bb, directory);
	},
	endProgram: () => {
		return endProgram();
	}
};
