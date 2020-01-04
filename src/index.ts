import { Grammar, tokenize } from "prismjs";
import { Theme } from "./theme";
import { escapePercent, tokenStreamToString } from "./utils";

/**
 * @param code The code to be highlighted
 * @param grammar A [Prism](https://prismjs.com) language grammar, typically taken from `Prism.languages`
 * @param theme The theme to highlight the code with
 * @returns The arguments to pass to `console.*`
 */
export function highlight(
  code: string,
  grammar: Grammar,
  { textColor, tokens }: Theme
) {
  const text: string[] = [];
  const css: string[] = [];
  tokenize(code, grammar).forEach(token => {
    if (typeof token === "string") {
      text.push(`%c${escapePercent(token)}`);
      css.push(textColor === null ? "" : `color:${textColor}`);
    } else {
      text.push(`%c${escapePercent(tokenStreamToString(token))}`);
      css.push(tokens.get(token.type) ?? "");
    }
  });
  return [text.join(""), ...css];
}

export * from "./theme";
