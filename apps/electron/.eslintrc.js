/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2022: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "script",
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};
