function _drawmovie(movie, x, y, w, h) {
	if (movie && movie.data) {
		if (!movie.data.paused && !movie.data.ended) {
			_graphicsContext.drawImage(movie.data, x, y, w, h);
		}
	}
}