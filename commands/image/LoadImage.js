/**
 * @param {string} filename
 */
async function _loadimage(filename) {
  /**
   * @type {{ canvas: Element; id: any; locked: boolean; x: number; y: number; scaleX: number; scaleY: number; rotate: number; transform11: number; transform21: number; transform12: number; transform22: number; context: any; }[]}
   */
  const image = [];
  var img = new Image();
  img.src = filename;
  filename = filename.replace(/\\/g, "/");
  const id = `loadimage_${filename}`;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const buffer = _graphicsCreate(img.width, img.height, id);
      buffer.context.drawImage(img, 0, 0);
      image.push(buffer);
      _maskimage(image, 0, 0, 0);
      resolve(image);
    };
    img.onerror = () => {
      console.warn(`LoadImage: Image "${filename}" not found.`);
      reject();
    };
  });
}
