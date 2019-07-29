function _channelplaying(channel) {
	return channel && channel.sound && channel.sound.playing(channel.id) ? 1 : 0;
}