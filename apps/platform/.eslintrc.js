const { resolve } = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: false,
  extends: ["../../.eslintrc.js", "next/core-web-vitals"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};

