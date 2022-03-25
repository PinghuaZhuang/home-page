var babel = require("rollup-plugin-babel");
var replace = require("rollup-plugin-replace");
var pkg = require("../package.json");

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

exports.banner = banner;
exports.getCompiler = getCompiler;
exports.getReplace = getReplace;
