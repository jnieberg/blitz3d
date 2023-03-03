import { ESLint } from "eslint";
import { parseBB } from "../parse/parseblitz.js";
import { parseErrors } from "../parse/parseerrors.js";
import blitzTestData from "./test-data.js";

describe("Blitz3D to JavaScript testing", () => {
  describe.each(blitzTestData)('File "$name"', ({ name, bb, js }) => {
    const result = parseBB({ bb, compact: true });
    it("can parse code", async () => {
      expect(result).toEqual(js);
    });

    it("can validate code", async () => {
      const /** @type {ESLint.LintResult["messages"]} */ errors = await parseErrors(result);
      const anyFatals = errors.some((error) => error.fatal);
      const anyFatalErrors = anyFatals && errors.map((error) => error.message);
      expect(anyFatalErrors).toBeFalsy();
    });
  });
});
