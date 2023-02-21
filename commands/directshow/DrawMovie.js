var _drawmovierate = _millisecs();
/**
 * @param {{name: string, data: HTMLVideoElement}} movie
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function _drawmovie(movie, x, y, width, height, buffer = _currentGraphicsBuffer) {
  if (movie && movie.data) {
    if (!movie.data.paused && !movie.data.ended) {
      buffer.context.drawImage(movie.data, x, y, width, height);
      let rate = 60 / (_millisecs() - _drawmovierate);
      rate = rate < 0.1 ? 0.1 : rate;
      rate = rate > 10 ? 10 : rate;
      movie.data.playbackRate = rate;
      _drawmovierate = _millisecs();
    }
  }
}
