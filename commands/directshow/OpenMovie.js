var _openMovieInterval = undefined;

async function _openmovie(filename) {
	const movie = document.createElement('video');
	movie.src = filename;
	movie.autoplay = true;
	movie.muted = true;
	movie.controls = false;
	return new Promise((resolve, reject) => {
		_openMovieInterval = setInterval(() => {
			if (movie.play) {
				clearInterval(_openMovieInterval);
				movie.play();
				resolve({
					name: filename.trim(),
					data: movie
				});
			}
		}, 100);
	});
}