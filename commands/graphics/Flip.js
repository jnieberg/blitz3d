var _flipSync = true;
function _flip() {
  if (_flipSync) {
    _flipSync = false;
    const back = _backbuffer();
    const front = _frontbuffer();
    const temp = _graphicsCreate(front.canvas.width, front.canvas.height, "_tempflip");

    temp.context.drawImage(front.canvas, 0, 0);

    front.context.clearRect(0, 0, front.canvas.width, front.canvas.height);
    front.context.drawImage(back.canvas, 0, 0);

    back.context.clearRect(0, 0, back.canvas.width, back.canvas.height);
    back.context.drawImage(temp.canvas, 0, 0);
  }
}
