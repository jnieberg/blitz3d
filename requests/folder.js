import { resolve } from "path";

export const folder = {
  base: resolve("."),
  shared: resolve("./public"),
  commands: resolve("./commands"),
  requests: resolve("./requests/commands"),
  static: resolve("./static"),
};
