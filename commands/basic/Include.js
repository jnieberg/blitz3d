/**
 * @param {string} filename
 */
function _include(filename) {
  return new Promise((resolve, reject) => {
    filename = filename.replace(/\\/g, "/");
    fetch(`${filename}.js?include=true`, { method: "GET" })
      .then((data) => data.text())
      .then((js) => {
        const fn = new Function(js);
        fn();
        resolve();
      });
  });
}
