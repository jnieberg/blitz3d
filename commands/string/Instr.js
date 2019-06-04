function _instr(string1, string2, offset = 1) {
	return string1.indexOf(string2, offset - 1) + 1;
}