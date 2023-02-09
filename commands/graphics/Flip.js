var _flipSync = true;
function _flip() {
  if (_flipSync) {
    _flipSync = false;
    const /** @type {HTMLCanvasElement} */ back = document.querySelector("#blitzBack");
    const /** @type {HTMLCanvasElement} */ front = document.querySelector("#blitz");
    _backbuffer().context = front.getContext("2d");
    _frontbuffer().context = back.getContext("2d");
  }
}
