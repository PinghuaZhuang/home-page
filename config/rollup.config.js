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
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import fg from "fast-glob";
import pkg from "../package.json";
import pug from "pug";
import merge from "lodash/merge";

import { getJson, resolve } from "./utils";
import * as common from "./rollup";

const prod = process.env.NODE_ENV === "production";
const entry = prod ? "entry.aio.min.js" : "entry.aio.js";
const dest = prod ? "dist" : ".runtime";

export default {
  input: "src/main.js",
  output: {
    file: `${dest}/${entry}`,
    // name: common.name,
    banner: common.banner,
  },
  plugins: [
    alias({
      resolve: [".js", ".scss", "pug"],
      entries: {
        "@": resolve("../src/"),
      },
    }),
    sass({
      output: resolve(`../${dest}/css/bundle.min.css`),
      options: {
        outputStyle: prod ? "compressed" : "expanded",
        sourceMap: true,
      },
    }),
    rpug({
      locals: pkg,
    }),
    svgSpriteLoader({
      symbolIdQuery: "icon-[name]",
    }),
    requireContext(),
    !prod && serve(".runtime"),
    !prod && livereload(),
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
          resolve("../package.json"),
          resolve("../.homepage"),
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
                resolve("../src/index.pug"),
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
