function _freesound(media) {
	if (media && media.unload) {
		media.unload();
	}
	return undefined;
}