function _soundpitch(media, pitch) {
	media.pitch = 0 + pitch / media.sound._sampleRate;
}