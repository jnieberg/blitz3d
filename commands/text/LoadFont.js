async function _loadfont(family, size, bold, italic, underline, name = family) {
  const result = {
    family: name,
    size: size - 4,
    height: size,
    bold: bold,
    italic: italic,
    underline: underline,
  };
  if (family.indexOf(".") > 0) {
    const fonts = document.querySelector("#blitzFonts");
    if (fonts.innerHTML.indexOf(`url('${family}')`) === -1) {
      const extList = {
        eot: "embedded-opentype",
        svg: "svg",
        ttf: "truetype",
        woff: "woff",
        woff2: "woff2",
        fon: "fon",
      };
      const ext = family.replace(/^(.*)\.(.*?)$/, "$2");
      const boldS = bold ? "bold" : "normal";
      const italicS = italic ? "italic" : "normal";
      fonts.innerHTML += `@font-face {
	font-family: '${name}';
	src: local('${name}'),
		url('${family}') format('${extList[ext]}');
	font-weight: ${boldS};
	font-style: ${italicS};
}
`;
      document.fonts.ready.then(() => {
        if (_currentGraphicsBuffer.context) {
          _currentGraphicsBuffer.context.font = `10px "${name}"`;
          _currentGraphicsBuffer.context.fillText("", 0, 0);
        }
      });
      return new Promise((resolve, reject) => {
        document.fonts.onloadingdone = function (fontFaceSetEvent) {
          _setfont(_setFontCurrent);
          resolve(result);
        };
      });
    }
  }
  return result;
}

function _loadfontsync(family, size, bold, italic, underline) {
  return {
    family: family,
    size: size - 4,
    height: size,
    bold: bold,
    italic: italic,
    underline: underline,
  };
}
