import { promises as fs } from "fs";
import { generateTheme } from "../src/theme";
import test from "ava";

test("basic theme parsing", (t) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = generateTheme(`.token.test {
    color: white;
  }`).tokens.get("test")![0];
  t.is(token.property, "color");
  t.is(token.value, "white");
});

test("textColor", (t) => {
  t.is(
    generateTheme(`code[class*="language-"] {
    color: red;
  }`).textColor,
    "red"
  );
});

test("existing theme", async (t) => {
  t.snapshot(
    generateTheme(
      await fs.readFile(require.resolve("prismjs/themes/prism.css"), "utf8")
    )
  );
});
