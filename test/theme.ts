import test from "ava";
import { promises as fs } from "fs";
import { generateTheme } from "../src/theme";

test("basic theme parsing", t => {
  t.snapshot(
    generateTheme(`.token.test {
    color: white;
  }`)
  );
});

test("get textColor", t => {
  t.snapshot(
    generateTheme(`code[class*="language-"] {
    background-color: red;
  }`)
  );
});

test("existing theme", async t => {
  t.snapshot(
    generateTheme(
      await fs.readFile(require.resolve("prismjs/themes/prism.css"), "utf8")
    )
  );
});
