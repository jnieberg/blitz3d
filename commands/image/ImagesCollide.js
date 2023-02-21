function _imagescollide(image, x, y, frame, image2, x2, y2, frame2) {
  if (image && image[frame] && image2 && image2[frame2]) {
    if (_imagesoverlap(image, x, y, image2, x2, y2, frame, frame2)) {
      const intersect = _imagescollideIntersection(
        x,
        y,
        image[frame].canvas.width,
        image[frame].canvas.height,
        x2,
        y2,
        image2[frame2].canvas.width,
        image2[frame2].canvas.height
      );
      if (intersect.width > 0 && intersect.height > 0) {
        const imgData1 = image[frame].context.getImageData(intersect.x - x, intersect.y - y, intersect.width, intersect.height);
        const imgData2 = image2[frame2].context.getImageData(intersect.x - x2, intersect.y - y2, intersect.width, intersect.height);
        var imgData1Data = [...imgData1.data];
        var imgData2Data = [...imgData2.data];
        for (var i = 3, _length = imgData1Data.length; i < _length; i += 4) {
          if (imgData1Data[i] > 0 && imgData2Data[i] > 0) {
            return 1;
          }
        }
      }
    }
  }
  return 0;
}

function _imagescollideIntersection(x, y, width, height, x2, y2, width2, height2) {
  var rect1Right = x + width,
    rect1Bottom = y + height,
    rect2Right = x2 + width2,
    rect2Bottom = y2 + height2;

  var rect3Left = Math.max(x, x2),
    rect3Top = Math.max(y, y2),
    rect3Right = Math.min(rect1Right, rect2Right),
    rect3Bottom = Math.min(rect1Bottom, rect2Bottom);

  return {
    x: rect3Left,
    y: rect3Top,
    width: Math.ceil(rect3Right - rect3Left),
    height: Math.ceil(rect3Bottom - rect3Top),
  };
}
