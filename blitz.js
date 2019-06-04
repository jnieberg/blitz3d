/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');
var path = require('path');
var commandsAsync = ['waitkey', 'keyhit', 'keydown', 'delay', 'input', 'waitmouse', 'getkey'].map((res) => `_${res}`);
var commandsStatic = ['class', 'in', 'of', 'var', 'case', 'select'];
var variableReserved = ['abstract', 'instanceof', 'super', 'boolean', 'enum', 'int', 'switch', 'break', 'export', 'interface', 'synchronized', 'byte', 'extends', 'let', 'this', 'case', 'long', 'throw', 'catch', 'final', 'native', 'throws', 'char', 'finally', 'new', 'transient', 'class', 'float', 'null', 'const', 'package', 'try', 'continue', 'function', 'private', 'typeof', 'debugger', 'goto', 'protected', 'var', 'default', 'public', 'void', 'delete', 'implements', 'volatile', 'import', 'short', 'double', 'in', 'static', 'with', 'alert', 'frames', 'outerHeight', 'all', 'frameRate', 'outerWidth', 'anchor', 'function', 'packages', 'anchors', 'getClass', 'pageXOffset', 'area', 'hasOwnProperty', 'pageYOffset', 'Array', 'hidden', 'parent', 'assign', 'history', 'parseFloat', 'blur', 'image', 'parseInt', 'button', 'images', 'password', 'checkbox', 'Infinity', 'pkcs11', 'clearInterval', 'isFinite', 'plugin', 'clearTimeout', 'isNaN', 'prompt', 'clientInformation', 'isPrototypeOf', 'propertyIsEnum', 'close', 'java', 'prototype', 'closed', 'JavaArray', 'radio', 'confirm', 'JavaClass', 'reset', 'constructor', 'JavaObject', 'screenX', 'crypto', 'JavaPackage', 'screenY', 'Date', 'innerHeight', 'scroll', 'decodeURI', 'innerWidth', 'secure', 'decodeURIComponent', 'layer', 'select', 'defaultStatus', 'layers', 'self', 'document', 'length', 'setInterval', 'element', 'link', 'setTimeout', 'elements', 'location', 'status', 'embed', 'Math', 'String', 'embeds', 'mimeTypes', 'submit', 'encodeURI', 'name', 'taint', 'encodeURIComponent', 'NaN', 'text', 'escape', 'navigate', 'textarea', 'eval', 'navigator', 'top', 'event', 'Number', 'toString', 'fileUpload', 'Object', 'undefined', 'focus', 'offscreenBuffering', 'unescape', 'form', 'open', 'untaint', 'forms', 'opener', 'valueOf', 'frame', 'option', 'window', 'onbeforeunload', 'ondragdrop', 'onkeyup', 'onmouseover', 'onblur', 'onerror', 'onload', 'onmouseup', 'ondragdrop', 'onfocus', 'onmousedown', 'onreset', 'onclick', 'onkeydown', 'onmousemove', 'onsubmit', 'oncontextmenu', 'onkeypress', 'onmouseout', 'onunload'];
var commands = [];
var commandsFiles = [];

function traverseDir(dir, files) {
	files = [];
	fs.readdirSync(dir).forEach(file => {
		let fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			files.push(...traverseDir(fullPath));
		} else {
			files.push(fullPath);
		}
	});
	return files;
}

function readCommands() {
	commandsFiles = traverseDir('commands/');
	return commandsFiles.map((filename) => filename.replace(/^.*[\\/]([!a-zA-Z0-9$#]*?)\.js$/g, '$1').toLowerCase());
}

function printCommands() {
	commands = readCommands();
	return commandsFiles.map((filename) => {
		return fs.readFileSync(filename)
	}).join('\n');
}

function printTools() {
	const tools = fs.readdirSync('tools/');
	return tools.map((filename) => fs.readFileSync('tools/' + filename)).join('\n');
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
	return '_debuglog(\'Program has ended\'); window.stop();';
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
	result = result.replace(/\(\b0([a-zA-Z][a-zA-Z0-9_$]*?)\b( *)\b([_a-zA-Z][a-zA-Z0-9_$#]*?)\b/gim, (res, a1, a2, a3) => {
		if (commandsStatic.indexOf(a3.replace(/^0/, '')) === -1) {
			return `(${a1},${a2}${a3}`;
		}
		return `(${a1}${a2}${a3}`;
	});
	result = result.replace(/\b0([a-zA-Z_][a-zA-Z0-9_$]*?)\b/gim, '$1');
	var brackWhile = 0;
	while (brackWhile < 10) {
		result = result.replace(/\(\((.*?)\)\)/gim, '($1)');
		brackWhile += 1;
	}
	return result;
}

function parsePart(part) {
	let result = part;
	let quotes = null;
	let comments = null;
	result = result.replace(/;(.*?)/gm, '//$1');
	[result, quotes] = backupText(result, 1, /".*?"/gm);
	[result, comments] = backupText(result, 2, / *\/\/(.*?)$/gm);
	result = result.toLowerCase();
	result = result.replace(/:/gm, '\n');
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');
	result = result.replace(/^(?!x2x)(.+)$/gm, '$1;');
	result = result.replace(/x2x *;/gm, ';x2x');
	result = result.replace(/(\b[a-zA-Z0-9_]+?)\$/gm, '$1');

	result = parseCommands(result);
	result = result.replace(/(\b[a-z][a-zA-Z0-9_$#]*\b)/gim, (result, a1) => {
		if (variableReserved.indexOf(a1) > -1) {
			return `${a1}_1`;
		}
		return a1;
	});

	result = result.replace(/^if *(.*?) *then +(.*?) +else +(.*?);/gim, 'if $1 then;\n$2;\nelse;\n$3;\nend if;');
	result = result.replace(/^if *(.*?) *then +(.*?);/gim, 'if $1 then;\n$2;\nend If;');
	result = result.replace(/^if *(.*?) *(?:then)?;/gim, 'if($1) {');
	result = result.replace(/^else *if *(.*?) *(?:then)?;/gim, '} else if($1) {');
	result = result.replace(/^else.*?;?/gim, '} else {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *\-(.*?);/gim, 'for(var $1=$2; $1<=$3; $1=$1-$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *(.*?);/gim, 'for(var $1=$2; $1<=$3; $1=$1+$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?);/gim, 'for(var $1=$2; $1<=$3; $1+=1) {');
	result = result.replace(/^for *(.*?)\.(.*?) *= *each(.*?);/gim, 'for($1 of _each($3)) {');
	result = result.replace(/(if|\bwhile)\b\((.*?)\) {$/gim, (state, m1, m2) => {
		return `${m1}(${m2.replace(/([^<>\n])=([^<>\n])/g, '$1==$2')}) {`;
	});
	result = result.replace(/<>/gim, '!=');
	result = result.replace(/^while *(.*?);/gim, 'while($1) {');
	result = result.replace(/^goto\((.*?)\);([\w\W]*?)\.\1;/gm, '$1: {\nbreak $1;\n$2}');
	result = result.replace(/^\.(.+?);/gm, '$1:');
	result = result.replace(/^dim\(([a-zA-Z0-9_$#]+?)\((\d+?)\)\);/gim, 'var $1 = new Array($2);');
	result = result.replace(/^([a-zA-Z0-9_$#]+?)\(([a-zA-Z0-9_$#]+?)\) *= */gim, '$1[$2] = ');

	result = result.replace(/(\b[a-z][a-zA-Z0-9$#]*?)\.([a-z][a-zA-Z0-9$#]*?\b)/gim, '$1');
	result = result.replace(/(\b[a-z][a-zA-Z0-9$#]*?\b)\\(\b[a-z][a-zA-Z0-9$#]*?\b)/gim, '$1.$2');
	result = result.replace(/\breturn\b *(.*?);/gim, 'return new Promise(resolve => {\nresolve($1);\n});');
	result = result.replace(/^end function;/gim, 'return new Promise(resolve => {\nresolve();\n});\n}');
	result = result.replace(/^end;/gim, 'window.stop();');
	result = result.replace(/^(wend|next);/gim, '}');
	result = result.replace(/^end *.*?;/gim, '}');
	result = result.replace(/%([01]+?\b)/gm, 'parseInt(\'$1\', 2) - 4294967296');
	result = result.replace(/\$([a-zA-Z0-9$#]+)/gim, '\'#$1\'');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *\^ *(\b[a-zA-Z0-9$#]+\b)/gim, '($1 ** $2)');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *xor *(\b[a-zA-Z0-9$#]+\b)/gim, '($1 ^ $2)');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *mod *(\b[a-zA-Z0-9$#]+\b)/gm, '($1 % $2)');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *shl *(\b[a-zA-Z0-9$#]+\b)/gm, '($1 << $2)');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *shr *(\b[a-zA-Z0-9$#]+\b)/gm, '($1 >> $2)');
	result = result.replace(/(\b[a-zA-Z0-9$#]+\b) *sar *(\b[a-zA-Z0-9$#]+\b)/gm, '($1 >>> $2)');

	const commandsMap = {
		select: 'switch($1) {',
		case: 'break;\ncase $1:',
		repeat: 'do {',
		default: 'break;\ndefault:',
		global: 'var $1;',
		local: 'let $1;',
		type: 'class $1 {',
		field: '$1 = null;',
		until: '} while(!($1));',
		goto: '',
		exit: 'break',
		and: '&& $1',
		or: '|| $1'
	};
	for (const c in commandsMap) {
		if (c && commandsMap[c]) {
			const commandRx = new RegExp(' *\\b' + c + '\\b *\\(?([^\\(\\)\\n\\;]*)\\)?;?', 'gim');
			result = result.replace(commandRx, commandsMap[c]);
		}
	}
	result = result.replace(/^switch([\w\W]*?)break;/gim, 'switch$1');

	result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)# *= *(_[a-zA-Z0-9_$#]*?\b)(.*?);/gm, '$1# = new Float($2_f$3);');
	result = result.replace(/^(\b[a-zA-Z0-9_\.]+?)# *= *(.*?);/gm, '$1# = new Float($2);');
	result = result.replace(/(\b[0-9]*?\.[0-9]+?\b)/gm, 'new Float($1)');
	const hashList = [];
	result = result.replace(/(\b[a-zA-Z0-9_\.]+?)#/gm, (res, a1) => {
		hashList.push(a1);
		return a1;
	});
	for (var hash of hashList) {
		const varRx = new RegExp(`(\\b(?:[a-zA-Z0-9_]+?\\.)?${hash}\\b)#?(?! *=)`, 'gim');
		result = result.replace(varRx, '$1.value');
		const varRx2 = new RegExp(`(\\b(?:[a-zA-Z0-9_]+?\\.)?${hash}\\b)#? *= *(_[a-zA-Z0-9_$#]+?\\b)`, 'gim');
		result = result.replace(varRx2, '$1 = $2_f');
	}
	result = result.replace(/(_[a-zA-Z0-9_$#]+?)\b\((.*?)\.value\b(.*?)\)/gm, '$1(new Float($2.value$3))');

	const varList = [];
	result = result.replace(/^(\b[a-zA-Z0-9_]+?) *= */gm, (result, a1) => {
		varList.push(`var ${a1};`);
		return result;
	});
	result = varList.join('\n') + '\n' + result;

	result = result.replace(/^function *(.*?);/gim, 'async function $1 {');
	result = result.replace(/(\b[a-z_][a-zA-Z0-9_$#]*\b) *(\(?)/gm, (com, a1, a2) => {
		const resultRx = new RegExp(`async *function *${a1} *\\(`, 'i')
		if (result.search(resultRx) > -1 || commandsAsync.indexOf(a1) > -1) {
			if (a2) {
				return `await ${a1}${a2}`;
			} else {
				return `await ${a1}()`;
			}
		}
		return com;
	});
	result = result.replace(/\bfunction await */gm, 'function ');

	result = restoreText(result, 2, comments);
	result = restoreText(result, 1, quotes);
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
