function _gfxmodeexists(width, height, depth) {
	return _graphicsModeList.find(result => result.width === width && result.height === height && result.depth === depth) ? 1 : 0;
}