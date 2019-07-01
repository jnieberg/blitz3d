async function _channelplaying(channel) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(channel.sound.playing(channel.id));
		});
	});
}