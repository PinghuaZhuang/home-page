import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import builtins from 'rollup-plugin-node-builtins'
import copy from 'rollup-plugin-copy'
import fg from 'fast-glob'
import pkg from '../package.json'
import rpug from 'rollup-plugin-pug'
import pug from 'pug'
import path from 'path'

const common = require('./rollup')

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/main.js',
  output: {
    file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
    name: common.name,
    banner: common.banner,
  },
  plugins: [
    rpug({
      locals: pkg,
    }),
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
              .replace(/\<%= title %\>/g, pkg.name)
              .replace(/\<%= baseUrl %\>/g, '/')
              .replace(
                /\<%= pug-entry %\>/g,
                pug.renderFile(path.resolve(__dirname, '../src/pug/index.pug'), {
                  name: 'Timothy'
                })
              )
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
