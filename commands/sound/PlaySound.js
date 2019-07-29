async function _playsound(media) {
	try {
		const id = media.sound.play();
		media.sound.rate(media.pitch, id);
		media.sound.volume(media.volume, id);
		media.sound.stereo(media.pan, id);
		media.sound.loop(media.loop, id);
		const channel = {
			id: id,
			sound: media.sound
		};
		while (await _async() && !_channelplaying(channel)) { }
		return channel;
	} catch (err) {
		console.warn('Failed to play sound', media.filename, '-', err.message);
	}
	return null;
}
