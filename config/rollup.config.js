var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var uglify = require('rollup-plugin-uglify')
var builtins = require('rollup-plugin-node-builtins')
var copy = require('rollup-plugin-copy')
var path = require('path')
var fg = require('fast-glob')

var common = require('./rollup.js')

var prod = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/main.js',
  output: {
    file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
    name: common.name,
    banner: common.banner,
  },
  plugins: [
    {
      name: 'watch-external',
      async buildStart(){
        const files = await fg('public/**/*')
        for(let file of files){
            this.addWatchFile(file);
        }
      },
    },
    copy({
      targets: [
        {
          src: 'public/index.html',
          dest: 'dist',
          transform: (contents, filename) =>
            contents
              .toString()
              .replace('<%= title %>', '90909090')
              .replace('<%= baseUrl %>', '90909090')
          },
        { src: 'public/css', dest: 'dist' },
      ],
    }),
    builtins(),
    common.getReplace(),
    nodeResolve({
      dedupe: [],
    }),
    commonjs(),
    common.getCompiler(),
    (prod && uglify()),
  ]
}
