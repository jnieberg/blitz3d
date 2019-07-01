async function _playmusic(filename) {
	const media = await _loadsound(filename);
	return _playsound(media);
}