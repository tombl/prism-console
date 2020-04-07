import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import shim from "rollup-plugin-shim";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "cjs",
      format: "commonjs",
    },
    {
      dir: "esm",
      format: "esm",
    },
  ],
  external: ["prismjs", "color-string", "css"],
  plugins: [
    shim({
      fs: "export {}",
      path: "export {}",
      util: "export {}",
      url: "export {}",
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs({
      namedExports: {
        prismjs: ["tokenize"],
      },
    }),
    typescript(),
    ...(process.env.MINIFY === "true" ? [terser()] : []),
  ],
};
