import test from "ava";
import { Token } from "prismjs";
import { escapePercent, tokenStreamToString } from "../src/utils";

test("tokenStreamToString(string)", t => {
  t.is(tokenStreamToString("foobar"), "foobar");
});

test("tokenStreamToString(string)[]", t => {
  t.is(tokenStreamToString(["foo", "bar"]), "foobar");
});

test("tokenStreamToString(token)", t => {
  t.is(tokenStreamToString(new Token("punctuation", "foobar")), "foobar");
});

test("escapePercent", t => {
  t.is(escapePercent("%c"), "%%c");
  t.is(escapePercent("foo%cbar"), "foo%%cbar");
  t.is(
    escapePercent(`console.log("3 %% 1 === 0")`),
    `console.log("3 %%%% 1 === 0")`
  );
});
