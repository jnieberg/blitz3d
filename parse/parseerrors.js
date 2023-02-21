import { ESLint } from "eslint";

export const parseErrors = async (/** @type {string} */ bb) => {
  const eslint = new ESLint();
  return new Promise((resolve) => {
    eslint.lintText(bb).then((lint) => {
      resolve(lint[0].messages);
    });
  });
};
