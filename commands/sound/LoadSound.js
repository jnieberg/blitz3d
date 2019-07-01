async function _loadsound(filename) {
	return new Promise((resolve, reject) => {
		const sound = new Howl({
			src: [filename],
			onloaderror: () => {
				resolve({
					filename: filename,
					sound: sound,
					volume: 1.0,
					pitch: 1.0,
					pan: 0.0,
					loop: false
				});
			}
		});
		sound.once('load', () => {
			resolve({
				filename: filename,
				sound: sound,
				volume: 1.0,
				pitch: 1.0,
				pan: 0.0,
				loop: false
			});
		});
	});
}