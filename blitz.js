/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');
var commandsAsync = [ 'waitkey', 'keyhit', 'keydown', 'delay', 'input$' ].map((res) => `${res}(`);

function readFiles(dirname) {
	const filenames = fs.readdirSync(dirname);
	return filenames.map((filename) => fs.readFileSync(dirname + filename)).join('\n');
}

function initialize() {
	return readFiles('commands/');
}

function backupText(body, num, rx) {
	let result = body.match(rx);
	return [ body.replace(rx, `{{${num}}}`), result ];
}

function restoreText(body, num, arr) {
	let result = body;
	let index = 0;
	while (result.indexOf(`{{${num}}}`) > -1) {
		result = result.replace(`{{${num}}}`, arr[index++]);
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
	[ result, quotes ] = backupText(result, 1, /".*?"/gm);
	[ result, comments ] = backupText(result, 2, /\/\/(.*?)$/gm);
	result = result.toLowerCase();
	result = result.replace(/:/gm, '\n');
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');
	result = result.replace(/^(?!\{\{2\}\})(.+)$/gm, '$1;');
	result = result.replace(/^function *(.*?);$/gim, 'async function $1 {');
	result = result.replace(/^if *(.*?) *then +(.*?) +else +(.*?);$/gim, 'if $1 then;\n$2;\nelse;\n$3;\nend if;');
	result = result.replace(/^if *(.*?) *then +(.*?);$/gim, 'if $1 then;\n$2;\nend If;');
	result = result.replace(/^if *(.*?) *(?:then)?;$/gim, 'if($1) {');
	result = result.replace(/^else *if *(.*?) *(?:then)?;$/gim, '} else if($1) {');
	result = result.replace(/^else.*?;?/gim, '} else {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?) step *(.*?)*;$/gim, 'for(var $1=$2; $1<=$3; $1+=$4) {');
	result = result.replace(/^for *(.*?) *= *(.*?) *to *(.*?);$/gim, 'for(var $1=$2; $1<=$3; $1++) {');
	result = result.replace(/^for *(.*?)\.(.*?) *= *each *\2;$/gim, 'for(_this_$1 in $1) {');
	result = result.replace(/^while *(.*?);$/gim, 'while($1) {');
	result = result.replace(/^(wend|next);$/gim, '}');
	result = result.replace(/^([a-z][a-zA-Z0-9$]*)\b *(?!\()([^=\n]*?);$/gm, '$1($2);');
	result = result.replace(/\b([a-z][a-zA-Z0-9$]*)\(/gm, (com) => {
		if (result.indexOf(`async function ${com}`) > -1 || commandsAsync.indexOf(com) > -1) {
			return `await ${com}`;
		}
		return com;
	});
	result = result.replace(/function await /gm, 'function ');
	result = result.replace(/(if|\bwhile)\b\((.*?)\) {$/gim, (state, m1, m2) => {
		return `${m1}(${m2.replace(/([^<>\n])=([^<>\n])/g, '$1==$2')}) {`;
	});
	result = result.replace(/(if|\bwhile)\b *\((.*?)<>/gim, '$1 $2!=');
	result = result.replace(/^goto\((.*?)\);([\w\W]*?)\.\1;$/gm, '$1: {\nbreak $1;\n$2}');
	result = result.replace(/^\.(.+?);$/gm, '$1:');
	result = result.replace(/^select *(.*?);[\w\W]*?break;/gim, 'switch$1 {');
	result = result.replace(/^dim\(([a-zA-Z0-9$]+?)\((\d+?)\)\);$/gim, 'var $1 = new Array($2);');
	result = result.replace(/^([a-zA-Z0-9$]+?)\(([a-zA-Z0-9$]+?)\) *= */gim, '$1[$2] = ');
	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.([a-zA-Z0-9$]+?) *= *new *\2;/gim, `var $2 = $2 || [];
$2.push(new _Class_$2());
var $1 = $1 || $2;
var _this_$1 = (typeof _this_$1 !== 'undefined') ? _this_$1 + 1 : 0;`);
	result = result.replace(/(\b[a-zA-Z0-9$]+?\b)\\(\b[a-zA-Z0-9$]+?\b)/gim, '$1[_this_$1].$2');
	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.?([a-zA-Z0-9$]+?\b)? *= *first *\2;/gim, '_this_$1 = 0;');
	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.?([a-zA-Z0-9$]+?\b)? *= *last *\2;/gim, '_this_$1 = $1.length - 1;');
	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.?([a-zA-Z0-9$]+?\b)? *= *after *\1;/gim, '_this_$1 = (typeof _this_$1 !== \'undefined\') ? (_this_$1 < $1.length - 1) ? _this_$1 + 1 : 0 : 0;');
	result = result.replace(/(\b[a-zA-Z0-9$]+?)\.?([a-zA-Z0-9$]+?\b)? *= *before *\1;/gim, '_this_$1 = (typeof _this_$1 !== \'undefined\') ? (_this_$1 > 0) ? _this_$1 - 1 : 0 : 0;');

	const commandsMap = {
		end: 'alert(\'Program has ended\'); window.stop();',
		case: 'break;\ncase $1:',
		repeat: 'do {',
		default: 'break;\ndefault:',
		return: 'return new Promise(resolve => {\nresolve($1)\n});',
		global: 'var $1;',
		type: 'class _Class_$1 {',
		field: '$1 = null;',
		until: '} while(!($1));',
		goto: '',
		exit: 'break',
		and: '&&',
		or: '||',
		not: '!',
		end: '}'
	};
	for (const c in commandsMap) {
		if (c && commandsMap[c]) {
			const commandRx = new RegExp(' *\\b' + c + '\\b *\\(?([^\\)\\n]*)\\)?;?', 'gim');
			result = result.replace(commandRx, commandsMap[c]);
		}
	}

	result = result.replace(/^(.+)(\{\{2\}\})(.*?);$/gm, '$1$3; $2');
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
