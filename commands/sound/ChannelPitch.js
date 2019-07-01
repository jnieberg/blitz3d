function _channelpitch(channel, pitch) {
	channel.sound.rate(0 + pitch / channel.sound._sampleRate, channel.id);
}