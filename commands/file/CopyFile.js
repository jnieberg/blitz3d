async function _copyfile(from, to) {
	await _postCommand('copyfile', {
		from: from,
		to: to
	})
}