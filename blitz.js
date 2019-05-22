/* eslint-disable new-cap */
// @ts-nocheck
/* eslint-env browser, node */
var fs = require('fs');

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

function parsePart(part) {
	let result = part;
	let quotes = null;
	let comments = null;
	result = result.replace(/;(.*?)/gm, '//$1');
	[ result, quotes ] = backupText(result, 1, /".*?"/gm);
	[ result, comments ] = backupText(result, 2, /\/\/(.*?)$/gm);
	result = result.replace(/:/gm, '\n');
	result = result.replace(/(^[\t ]+|[\t ]+$)/gm, '');
	result = result.replace(/^(?!\{\{2\}\})(.+)$/gm, '$1;');
	result = result.replace(/^Function *(.*?);$/gm, 'async function $1 {');
	result = result.replace(/^([a-z][a-zA-Z0-9]*) *= *([a-z][a-zA-Z0-9]+)\((.*?)\);$/gm, '$1 = $2($3);');
	result = result.replace(/\b([a-z][a-zA-Z0-9]+)\((.*?)\);$/gm, '$1($2);');
	result = result.replace(/\b([a-z][a-zA-Z0-9]+)\(/gm, 'await $1(');
	result = result.replace(/function await /gm, 'function ');
	result = result.replace(/\b(WaitKey|KeyHit|KeyDown)\b/gm, 'await $1');
	result = result.replace(/^Global *(.*?);/gm, 'var $1;');
	result = result.replace(/^Case *(.*?);/gm, 'break;\ncase $1:');
	result = result.replace(/^Select *(.*?);[\w\W]*?break;/gm, 'switch($1) {');
	result = result.replace(/^If *(.*?) *Then +(.*?) +Else +(.*?);$/gm, 'If $1 Then;\n$2;\nElse;\n$3;\nEnd If;');
	result = result.replace(/^If *(.*?) *Then +(.*?);$/gm, 'If $1 Then;\n$2;\nEnd If;');
	result = result.replace(/(If|\bWhile)\b *([^<>\n]*?)=/gm, '$1 $2==');
	result = result.replace(/(If|\bWhile)\b *(.*?)<>/gm, '$1 $2!=');
	result = result.replace(/^If *(.*?) *(?:Then)?;$/gm, 'if($1) {');
	result = result.replace(/^Else *If *(.*?) *(?:Then)?;$/gm, '} else if($1) {');
	result = result.replace(/^Else.*?;?/gm, '} else {');
	result = result.replace(/^While *(.*?);$/gm, 'while($1) {');
	result = result.replace(/^Wend;$/gm, '}');
	result = result.replace(/\bNot +/gm, '!');
	result = result.replace(/^End *(.*?);/gm, '}');
	result = result.replace(/\bTrue\b/gm, 'true');
	result = result.replace(/\bFalse\b/gm, 'false');
	result = result.replace(/^([A-Z][a-zA-Z0-9]+) (.*?);$/gm, '$1($2);');
	result = result.replace(/^([A-Z][a-zA-Z0-9]+);$/gm, '$1();');
	result = result.replace(/^Return\((.*?)\);$/gm, 'return new Promise(resolve => {\nresolve($1)\n});');
	result = result.replace(/^(.+)(\{\{2\}\})(.*?);$/gm, '$1$3; $2');
	result = restoreText(result, 2, comments);
	result = restoreText(result, 1, quotes);
	return result;
}

function endProgram() {
	return `setTimeout(() => alert(\'Program ended\'), 100);`;
}

module.exports = {
	parseBlitz: (bb) => {
		return `${initialize()}
(async function Main() {
${parsePart(bb)}
${endProgram()}
})();`;
	}
};
