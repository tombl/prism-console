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

export function escapePercent(input: string) {
  return input.replace(/%+/g, replace => "%".repeat(replace.length * 2));
}
