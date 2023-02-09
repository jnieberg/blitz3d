var _setFontCurrent = {
  family: "courier",
  size: 13,
  height: 17,
  bold: false,
  italic: false,
  underline: false,
};

/**
 * @param {{ family: string; size: number; height?: number; bold: boolean; italic: boolean; underline: boolean; }} font
 */
function _setfont(font, buffer = _currentGraphicsBuffer) {
  if (buffer.context) {
    _setFontCurrent = font;
    const weightS = font.bold ? "bold " : "";
    const italicS = font.italic ? "italic " : "";
    const underlinedS = font.underline ? "underline " : "";
    buffer.context.font = `${italicS}${weightS}${font.size}px "${font.family}"`;
  }
}
