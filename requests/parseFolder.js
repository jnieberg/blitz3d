const fs = require("fs");
const path = require("path");
const baseDirectory = path.dirname(require.main.filename);
const sharedDirectory = path.normalize(baseDirectory + "/public");

module.exports = {
  parseFolder: (req, res) => {
    const directory = sharedDirectory;
    const url = path
      .normalize(decodeURI(req.url))
      .replace(/\\/g, "/")
      .replace(/\/[^\/]+?\.[^\/]+?$/, "")
      .replace(/\/$/, "");
    const urlPart = url.split("/");
    const folder = path.normalize(`${directory}${url}`);
    let files;
    try {
      files = fs.readdirSync(folder);
    } catch (err) {
      return;
    }
    if (files) {
      let result = {
        file: [],
        folder: [],
      };
      if (url !== "/") {
        let urlLast = "";
        const urlWhole = urlPart.map((res, index) => {
          urlLast += res + "/";
          if (index === urlPart.length - 1) {
            return `<span class="back">${res || "."}</span>`;
          } else {
            return `<a href="${urlLast}" class="back">${res || "."}</a>`;
          }
        });
        result.folder.push(`<li class="heading">${urlWhole.join("/")}</li>`);
      } else {
        result.folder.push(`<li class="heading"><span>${url}</span></li>`);
      }
      files.forEach((file) => {
        const href = path.normalize(`${url}/${file}`).replace(/\\/g, "/");
        let type = "file";
        if (fs.statSync(folder + "/" + file).isDirectory()) {
          type = "folder";
        }
        result[type].push(`<li><a href="${href}" class="${type}">${file}</a></li>`);
      });
      return `<a class="reload" href="/reload" alt="Reload page" title="Reload page">↺</a>
<ul>
	${result.folder.join("")}
	${result.file.join("")}
</ul>`;
    }
    return "";
  },
};
