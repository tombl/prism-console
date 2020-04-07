import { TokenStream } from "prismjs";
export function tokenStreamToString(tokenStream: TokenStream): string {
  if (typeof tokenStream === "string") {
    return tokenStream;
  } else if (Array.isArray(tokenStream)) {
    return tokenStream.map(tokenStreamToString).join("");
  } else {
    return tokenStreamToString(tokenStream.content);
  }
}

export function escapePercent(input: string): string {
  return input.replace(/%+/g, (replace) => "%".repeat(replace.length * 2));
}

export const ansiReset = "\u001b[0m";
export function ansiRGB(r: number, g: number, b: number): string {
  return `\u001b[${[38, 2, r, g, b].join(";")}m`;
}

export enum Platform {
  Browser,
  Node,
}

export function getPlatform(): Platform {
  return typeof process !== "undefined" &&
    !("browser" in process) &&
    process?.versions?.node !== undefined
    ? Platform.Node
    : Platform.Browser;
}
