var _debugLogCount = 0;
/**
 * @param {string} text
 */
function _debuglog(text, color = "#fff") {
  const debug = document.querySelector(".debug");
  debug.innerHTML += `<span style="color:${color};" id="debug-log-${_debugLogCount}"></span>\n`;
  ((txt, i) => {
    setTimeout(() => {
      const debugSpan = document.querySelector(`.debug span#debug-log-${i}`);
      if (debugSpan) {
        debugSpan.innerHTML += txt;
      }
      document.querySelector(".debug").scrollTo(0, document.querySelector(".debug").scrollHeight);
    }, 100);
  })(text, _debugLogCount);
  _debugLogCount += 1;
}

/**
 * @param {string} err
 */
function _errorlog(err, log = false) {
  if (log) console.error(err);
  try {
    const error = err.replace(/[\t ]+/gm, " ");
    const message = error.replace(/^.*: *([\w\W]*?) *\n? *\bat\b[\w\W]*$/g, "$1");
    const file = error.replace(/^.* +at +https?:\/\/.*\/(.*?)\.js:.*$/g, "$1").toUpperCase();
    const line = error.replace(/^.*: *([\w\W]*?) *\n? *\bat\b .*?:(\d+?):[\w\W]*$/g, "$2");
    _debuglog(`${message} at line ${line}`, "#f57");
  } catch (e) {}
}
