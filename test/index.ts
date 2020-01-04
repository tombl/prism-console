import test from "ava";
import { promises as fs } from "fs";
import { languages } from "prismjs";
import { generateTheme, highlight, Theme } from "../src";

test("highlight", async t => {
  t.snapshot(
    highlight(
      `console.log("test")`,
      languages.javascript,
      generateTheme(
        await fs.readFile(require.resolve("prismjs/themes/prism.css"), "utf8")
      )
    )
  );
});

test("no background-color and missing token", t => {
  t.snapshot(
    highlight(`console.log("test")`, languages.javascript, generateTheme(""))
  );
});
