import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import builtins from "rollup-plugin-node-builtins";
import copy from "rollup-plugin-copy";
import sass from "rollup-plugin-sass";
import rpug from "rollup-plugin-pug";
import alias from "rollup-plugin-alias";
import svgSpriteLoader from "rollup-plugin-svg-sprite-loader";
import requireContext from "rollup-plugin-require-context";

import fg from "fast-glob";
import pkg from "../package.json";
import pug from "pug";
import path from "path";
import merge from "lodash/merge";

const { getJson } = require("./utils");
const common = require("./rollup");

const prod = process.env.NODE_ENV === "production";
const entry = prod ? "entry.aio.min.js" : "entry.aio.js";
const dest = prod ? "dist" : ".runtime";

module.exports = {
  input: "src/main.js",
  output: {
    file: `${dest}/${entry}`,
    name: common.name,
    banner: common.banner,
  },
  plugins: [
    alias({
      resolve: [".js", ".scss", "pug"],
      entries: {
        "@": path.resolve(__dirname, "../src/"),
      },
    }),
    sass({
      output: path.resolve(__dirname, `../${dest}/css/bundle.min.css`),
      insert: true,
    }),
    rpug({
      locals: pkg,
    }),
    svgSpriteLoader({
      symbolIdQuery: "icon-[name]",
    }),
    requireContext(),
    {
      name: "watch-external",
      async buildStart() {
        const files = await fg("public/**/*");
        const pugSources = await fg("src/**/*.pug");
        const scssSources = await fg("src/**/*.scss");

        for (let file of [
          ...files,
          ...pugSources,
          ...scssSources,
          path.resolve(__dirname, "../package.json"),
          path.resolve(__dirname, "../.homepage"),
        ]) {
          this.addWatchFile(file);
        }
      },
    },
    copy({
      targets: [
        { src: "public/css", dest },
        { src: "public/assets", dest },
        { src: "public/js", dest },
        { src: ["public/*"], dest },
        {
          src: "public/index.html",
          dest,
          transform: (contents, filename) =>
            pug
              .renderFile(
                path.resolve(__dirname, "../src/index.pug"),
                merge(getJson("../.homepage"), {
                  pkg: getJson("../package.json"),
                })
              )
              .toString()
              .replace(/\<%= entry %\>/g, entry),
        },
      ],
    }),
    builtins(),
    common.getReplace(),
    nodeResolve({
      dedupe: [],
    }),
    commonjs(),
    common.getCompiler(),
    prod && uglify(),
  ],
};
