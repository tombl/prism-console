import * as css from "css";

export interface Theme {
  textColor: string | null;
  tokens: Map<string, Array<{ property: string; value: string }>>;
}

/**
 * You can find themes in Prism's [main GitHub repo](https://github.com/PrismJS/prism/tree/master/themes) or their [extra themes repo](https://github.com/PrismJS/prism-themes/tree/master/themes)
 * @param stylesheet The CSS source for the Prism theme
 */
export function generateTheme(stylesheet: string): Theme {
  const tokens = new Map<string, Array<{ property: string; value: string }>>();
  let textColor: string | null = null;
  (css
    .parse(stylesheet)
    .stylesheet?.rules.filter(
      ({ type }) => type === "rule"
    ) as css.Rule[]).forEach(({ declarations, selectors }) => {
    selectors?.forEach((selector) => {
      if (selector === `code[class*="language-"]`) {
        textColor =
          (declarations?.filter(
            ({ type }) => type === "declaration"
          ) as css.Declaration[]).filter(
            ({ property }) => property === "color"
          )[0]?.value ?? null;
      }
      const classes = selector.split(".").slice(1);
      if (classes.includes("token") && classes.length === 2) {
        tokens.set(
          classes.filter((className) => className !== "token")[0],
          (declarations?.filter(
            ({ type }) => type === "declaration"
          ) as css.Declaration[])
            .filter(
              (rule) => rule.property !== undefined && rule.value !== undefined
            )
            .map(({ property, value }) => ({
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              property: property!,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              value: value!,
            }))
        );
      }
    });
  });
  return { textColor, tokens };
}
