import { Grammar, tokenize } from "prismjs";
import {
  Platform,
  ansiRGB,
  ansiReset,
  escapePercent,
  getPlatform,
  tokenStreamToString,
} from "./utils";

import { Theme } from "./theme";
import { get } from "color-string";

/**
 * @param code The code to be highlighted
 * @param grammar A [Prism](https://prismjs.com) language grammar, typically taken from `Prism.languages`
 * @param theme The theme to highlight the code with
 * @param platform The platform
 * @returns The arguments to pass to `console.*`
 */
export function highlight(
  code: string,
  grammar: Grammar,
  theme: Theme,
  platform: Platform = getPlatform()
): string[] {
  const tokens = tokenize(code, grammar);
  if (platform === Platform.Browser) {
    const text: string[] = [];
    const css: string[] = [];
    tokens.forEach((token) => {
      if (typeof token === "string") {
        text.push(`%c${escapePercent(token)}`);
        css.push(theme.textColor === null ? "" : `color:${theme.textColor}`);
      } else {
        text.push(`%c${escapePercent(tokenStreamToString(token.content))}`);
        css.push(
          theme.tokens
            .get(token.type)
            ?.map(({ property, value }) => `${property}:${value}`)
            .join(";") ?? ""
        );
      }
    });
    return [text.join(""), ...css];
  } else if (platform === Platform.Node) {
    return [
      tokens
        .map((token) => {
          let color: [number, number, number, number] | null = null;
          if (typeof token === "string") {
            color = theme.textColor === null ? null : get.rgb(theme.textColor);
          } else {
            const cssColor = theme.tokens
              .get(token.type)
              ?.find(({ property }) => property.toLowerCase() === "color")
              ?.value;
            color = cssColor === undefined ? null : get.rgb(cssColor);
          }
          if (color === null) {
            return ansiReset + tokenStreamToString(token);
          } else {
            const [r, g, b] = color;
            return ansiRGB(r, g, b) + tokenStreamToString(token);
          }
        })
        .join("") + ansiReset,
    ];
  }
  return platform;
}

export * from "./theme";
export { Platform } from "./utils";
