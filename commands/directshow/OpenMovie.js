/**
 * @type {NodeJS.Timer}
 */
var _openMovieInterval = undefined;
var _openMoviePlaying = false;

/**
 * @param {string} filename
 */
async function _openmovie(filename) {
  const movie = document.createElement("video");
  movie.src = filename;
  movie.autoplay = true;
  movie.muted = true;
  movie.controls = false;
  movie.loop = true;
  movie.addEventListener("canplaythrough", play, false);
  _openMovieInterval = undefined;
  _openMoviePlaying = false;

  function play() {
    movie.play();
    _openMoviePlaying = true;
  }
  return new Promise((resolve) => {
    _openMovieInterval = setInterval(() => {
      if (_openMoviePlaying) {
        clearInterval(_openMovieInterval);
        resolve({
          name: filename.trim(),
          data: movie,
        });
      }
    }, 100);
  });
}
