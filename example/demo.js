const { languages } = require("prismjs");
const { generateTheme, highlight } = require("../cjs");
const { readFileSync } = require("fs");

const theme = generateTheme(
  readFileSync(
    require.resolve("prism-theme-one-dark/prism-onedark.css"),
    "utf8"
  )
);

const code = `var x = console.log("test");`;

console.log(...highlight(code, languages.javascript, theme));
