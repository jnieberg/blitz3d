/**
 * @type {Element}
 */
var _eventCanvas = undefined;
/**
 * @type {Element}
 */
var _mouseElement = undefined;

window.onload = () => {
  if (_eventCanvas) {
    _mouseElement = document.querySelector("#blitzPointer");
    _eventCanvas.requestPointerLock = _eventCanvas.requestPointerLock || _eventCanvas.mozRequestPointerLock || _eventCanvas.webkitRequestPointerLock;
    document.pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    document.addEventListener("mousemove", (event) => {
      var rect = _eventCanvas.getBoundingClientRect();
      _mouseXSpeedOffset = event.movementX;
      _mouseYSpeedOffset = event.movementY;
      if (_pointerLocked) {
        _mouseXPosition += _mouseXSpeedOffset;
        _mouseYPosition += _mouseYSpeedOffset;
      } else {
        _mouseXPosition = event.x - _eventCanvas.offsetLeft;
        _mouseYPosition = event.y - _eventCanvas.offsetTop;
      }
      _mouseXPosition = _mouseXPosition < 0 ? 0 : _mouseXPosition > _eventCanvas.width ? _eventCanvas.width : _mouseXPosition;
      _mouseYPosition = _mouseYPosition < 0 ? 0 : _mouseYPosition > _eventCanvas.height ? _eventCanvas.height : _mouseYPosition;
      _mouseElement.setAttribute("style", `left: ${_mouseXPosition + rect.left}px; top: ${_mouseYPosition + rect.top}px;`);
    });
    document.addEventListener("wheel", (event) => {
      _mouseZSpeedOffset = -event.deltaY / 100;
      _mouseZPosition += _mouseZSpeedOffset;
    });

    _eventCanvas.oncontextmenu = function (/** @type {any} */ e) {
      return false;
    };

    // _eventCanvas.addEventListener('click', (event) => {
    // 	_lockPointer();
    // });
  }
};

window.addEventListener("error", (/** @type { ErrorEvent } */ event) => {
  console.log(event);
  _errorlog(`${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
});

var _pointerLocked = false;
// document.addEventListener('pointerlockchange', (event) => {
// 	if (document.pointerLockElement === _eventCanvas) {
// 		_mouseElement.classList.add('show');
// 		_pointerLocked = true;
// 	} else {
// 		_mouseElement.classList.remove('show');
// 		_pointerLocked = false;
// 	}
// });
