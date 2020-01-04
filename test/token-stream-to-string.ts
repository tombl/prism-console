import test from "ava";
import { Token } from "prismjs";
import { tokenStreamToString } from "../src/token-stream-to-string";

test("string", t => {
  t.is(tokenStreamToString("foobar"), "foobar");
});

test("string[]", t => {
  t.is(tokenStreamToString(["foo", "bar"]), "foobar");
});

test("token", t => {
  t.is(tokenStreamToString(new Token("punctuation", "foobar")), "foobar");
});
