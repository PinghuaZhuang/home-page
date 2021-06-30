// rollup.config.js
// umd
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var builtins = require('rollup-plugin-node-builtins');

var common = require('./rollup.js');

var prod = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/main.js',
    output: {
        file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
        format: 'cjs',
        name: common.name,
        banner: common.banner,
    },
    plugins: [
        builtins(),
        common.getReplace(),
        nodeResolve({
            dedupe: [],
        }),
        commonjs(),
        common.getCompiler(),
        (prod && uglify()),
    ]
};
