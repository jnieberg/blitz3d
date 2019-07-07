function _drawmovie(movie, x, y, width, height, buffer = _graphicsBuffer) {
	if (movie && movie.data) {
		if (!movie.data.paused && !movie.data.ended) {
			_drawblockrect(movie.data, x, y, 0, 0, width, height, frame, true, buffer);
		}
	}
}