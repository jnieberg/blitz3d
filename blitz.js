/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');
var commandsAsync = ['waitkey', 'keyhit', 'keydown', 'delay', 'input$'].map((res) => `${res}(`);
var commandsStatic = ['class', 'in', 'of', 'var', 'case', 'select']
var commands = [];

function readFiles(dirname) {
	const filenames = fs.readdirSync(dirname);
	commands = filenames.map((filename) => filename.replace(/\.js$/g, '').toLowerCase());
	return filenames.map((filename) => fs.readFileSync(dirname + filename)).join('\n');
}

function initialize() {
	return readFiles('commands/');
}

function backupText(body, num, rx) {
	let result = body.match(rx);
	return [body.replace(rx, `_${num}_`), result];
}

function restoreText(body, num, arr) {
	let result = body;
	let index = 0;
	while (result.indexOf(`_${num}_`) > -1) {
		result = result.replace(`_${num}_`, arr[index++]);
	}
	return result;
}

function parseCommands(result) {
	const comRx = /(\b[a-zA-Z][a-zA-Z0-9$]*)( *)([^=\r\n]*?) *[;{]$/gim;
	var comWhile = 0;
	while (comWhile < 10) {
		result = result.replace(comRx, (res, a1, a2, a3) => {
			a1 = a1.replace(/[\(\)]/g, '');
			if (commands.indexOf(a1) > -1) {
				return `_${a1}(${a3});`;
			}
			return `0${a1}${a2}${a3};`;
		});
		comWhile += 1;
	}
	result = result.replace(/\(\b0([a-zA-Z][a-zA-Z0-9$]*?)\b( *)\b([_a-zA-Z][a-zA-Z0-9$]*?)\b/gim, (res, a1, a2, a3) => {
		if (commandsStatic.indexOf(a3.replace(/^0/, '')) === -1) {
			return `(${a1},${a2}${a3}`;
		}
		return `(${a1}${a2}${a3}`;
	});
	result = result.replace(/\b0([a-zA-Z][a-zA-Z0-9$]*?)\b/gim, '$1');
	var brackWhile = 0;
	while (brackWhile < 10) {
		result = result.replace(/\(\((.*?)\)\)/gim, '($1)');
		brackWhile += 1;
	}
	return result;
}

function endProgram() {
	return `alert('Program has ended');
window.stop();`;
}

function parsePart(part) {
	let result = part;
	let quotes = null;
	let comments = null;
	result = result.replace(/;(.*?)/gm, '//$1');
	[result, quotes] = backupText(result, 1, /".*?"/gm);
	[result, comments] = backupText(result, 2, /\/\/(.*?)$/gm);
	result = result.toLowerCase();
	result = result.replace(/:/gm, '\n');
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');
	result = result.replace(/^(?!_2_)(.+)$/gm, '$1;');
	result = parseCommands(result);

	result = result.replace(/^if *(.*?) *then +(.*?) +else +(.*?);$/gim, 'if $1 then;\n$2;\nelse;\n$3;\nend if;');
	result = result.replace(/^if *(.*?) *then +(.*?);$/gim, 'if $1 then;\n$2;\nend If;');
	result = result.replace(/^if *(.*?) *(?:then)?;$/gim, 'if($1) {');
	result = result.replace(/^else *if *(.*?) *(?:then)?;$/gim, '} else if($1) {');
	result = result.replace(/^else.*?;?/gim, '} else {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *(.*?)*;$/gim, 'for(var $1=$2; $1<=$3; $1+=$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?);$/gim, 'for(var $1=$2; $1<=$3; $1++) {');
	result = result.replace(/^for *(.*?)\.(.*?) *= *each(.*?);$/gim, 'for($1 of _each($3)) {');
	result = result.replace(/^(wend|next);$/gim, '}');
	result = result.replace(/(if|\bwhile)\b\((.*?)\) {$/gim, (state, m1, m2) => {
		return `${m1}(${m2.replace(/([^<>\n])=([^<>\n])/g, '$1==$2')}) {`;
	});
	result = result.replace(/(if|\bwhile)\b *\((.*?)<>/gim, '$1 $2!=');
	result = result.replace(/^while *(.*?);$/gim, 'while($1) {');
	result = result.replace(/^goto\((.*?)\);([\w\W]*?)\.\1;$/gm, '$1: {\nbreak $1;\n$2}');
	result = result.replace(/^\.(.+?);$/gm, '$1:');
	result = result.replace(/^dim\(([a-zA-Z0-9$]+?)\((\d+?)\)\);$/gim, 'var $1 = new Array($2);');
	result = result.replace(/^([a-zA-Z0-9$]+?)\(([a-zA-Z0-9$]+?)\) *= */gim, '$1[$2] = ');

	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.([a-zA-Z0-9$]+?\b)/gim, '$1');
	result = result.replace(/(\b[a-zA-Z0-9$]+?\b)\\(\b[a-zA-Z0-9$]+?\b)/gim, '$1.$2');
	result = result.replace(/\breturn\b *\(?([^\(\)\n\;]*)\)?;?/gim, 'return new Promise(resolve => {\nresolve($1);\n});\n}');
	result = result.replace(/^end function;$/gim, 'return new Promise(resolve => {\nresolve(undefined);\n});\n}');
	result = result.replace(/^end;$/gim, endProgram());
	result = result.replace(/^end *.*?;$/gim, '}');

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
			console.log(c, commandsMap[c]);
			const commandRx = new RegExp(' *\\b' + c + '\\b *\\(?([^\\(\\)\\n\\;]*)\\)?;?', 'gim'); // / *\bfoo\b *\(?([^\(\)\n\;]*)\)?;?/gim
			result = result.replace(commandRx, commandsMap[c]);
		}
	}
	result = result.replace(/^switch([\w\W]*?)break;/gim, 'switch$1');

	result = result.replace(/^function *(.*?);$/gim, 'async function $1 {');
	result = result.replace(/\b([a-z][a-zA-Z0-9$]*)\(/gm, (com) => {
		if (result.indexOf(`async function ${com}`) > -1 || commandsAsync.indexOf(com) > -1) {
			return `await ${com}`;
		}
		return com;
	});
	result = result.replace(/function await /gm, 'function ');

	result = result.replace(/^(.+)(_2_)(.*?);$/gm, '$1$3; $2');
	result = restoreText(result, 2, comments);
	result = restoreText(result, 1, quotes);
	return result;
}

module.exports = {
	parseBlitz: (bb) => {
		return `${initialize()}
(async function Main() {
${parsePart(bb)}
setTimeout(() => {
${endProgram()}
}, 100);
})();`;
	}
};
