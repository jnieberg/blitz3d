var _dataList = [];
/**
 * @param {string} label
 * @param {any[]} data
 */
function _data(label, ...data) {
  _dataList.push(`__${label}`, ...data);
}
