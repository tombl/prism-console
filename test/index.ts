import { Platform, Theme, generateTheme, highlight } from "../src";
import anyTest, { TestInterface } from "ava";

import { promises as fs } from "fs";
import { languages } from "prismjs";

const test = anyTest as TestInterface<{ theme: Theme }>;

test.before(async (t) => {
  t.context.theme = generateTheme(
    await fs.readFile(require.resolve("prismjs/themes/prism.css"), "utf8")
  );
});

test("node highlight", (t) => {
  t.snapshot(
    highlight(
      `console.log("test")`,
      languages.javascript,
      t.context.theme,
      Platform.Node
    )
  );
});

test("browser highlight", (t) => {
  t.snapshot(
    highlight(
      `console.log("test")`,
      languages.javascript,
      t.context.theme,
      Platform.Browser
    )
  );
});

test("percent in input", (t) => {
  t.snapshot(
    highlight(
      `console.log("%ctest", "color:blue")`,
      languages.javascript,
      t.context.theme,
      Platform.Browser
    )
  );
});

test("no background-color and missing token", (t) => {
  t.snapshot(
    highlight(`console.log("test")`, languages.javascript, generateTheme(""))
  );
});
