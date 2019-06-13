function _movieplaying(movie) {
	return movie.data.paused || movie.data.ended ? 0 : 1;
}