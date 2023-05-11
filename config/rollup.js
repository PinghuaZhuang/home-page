import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import pkg from "../package.json";

var version = pkg.version;
var banner = `/*!
 * ${pkg.name} ${version}
 */
`;

function getCompiler() {
  return babel({
    babelrc: true,
    runtimeHelpers: true,
    // exclude: 'node_modules/**'
  });
}

function getReplace() {
  return replace({
    PKG_VERSION: JSON.stringify(pkg.version),
  });
}

export { banner, getCompiler, getReplace };
