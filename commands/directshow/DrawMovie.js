function _drawmovie(movie, x, y, w, h) {
	if (movie && movie.data) {
		if (!movie.data.paused && !movie.data.ended) {
			_graphicsBuffer.context.drawImage(movie.data, x + _originX, y + _originY, w, h);
		}
	}
}