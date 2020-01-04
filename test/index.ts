import anyTest, { TestInterface } from "ava";
import { promises as fs } from "fs";
import { languages } from "prismjs";
import { generateTheme, highlight, Theme } from "../src";

const test = anyTest as TestInterface<{ theme: Theme }>;

test.before(async t => {
  t.context.theme = generateTheme(
    await fs.readFile(require.resolve("prismjs/themes/prism.css"), "utf8")
  );
});

test("highlight", t => {
  t.snapshot(
    highlight(`console.log("test")`, languages.javascript, t.context.theme)
  );
});

test("percent in input", t => {
  t.snapshot(
    highlight(
      `console.log("%ctest", "color:blue")`,
      languages.javascript,
      t.context.theme
    )
  );
});

test("no background-color and missing token", t => {
  t.snapshot(
    highlight(`console.log("test")`, languages.javascript, generateTheme(""))
  );
});
