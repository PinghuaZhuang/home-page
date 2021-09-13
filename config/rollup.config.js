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
        const sources = await fg('src/**/*.pug')
        for(let file of [...files, ...sources]){
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
            pug
              .renderFile(path.resolve(__dirname, '../src/index.pug'), {
                "head": {
                  "title": "一个坏掉的番茄",
                  "description": "Author:ZhuangPinghua,Category:Personal Blog",
                  "favicon": "favicon.ico"
                },
                "intro": {
                  "title": "ZhuangPinghua",
                  "subtitle": "Front engineer",
                  "enter": "enter",
                  "supportAuthor": true,
                  "background": true
                },
                "main": {
                  "name": "Simon Ma",
                  "signature": "Code & Input & Output",
                  "avatar": {
                    "link": "assets/avatar.jpg",
                    "height": "100",
                    "width": "100"
                  },
                  "ul": {
                    "first": {
                      "href": "blog/",
                      "icon": "bokeyuan",
                      "text": "Blog"
                    },
                    "second": {
                      "href": "about/",
                      "icon": "xiaolian",
                      "text": "About"
                    },
                    "third": {
                      "href": "mailto:simon@tomotoes.com",
                      "icon": "email",
                      "text": "Email"
                    },
                    "fourth": {
                      "href": "https://github.com/tomotoes",
                      "icon": "github",
                      "text": "Github"
                    }
                  }
                }
              })
              .toString()
              .replace(/\<%= title %\>/g, pkg.name)
          },
        { src: 'public/css', dest: 'dist' },
        { src: 'public/assets', dest: 'dist' },
        { src: 'public/js', dest: 'dist' },
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
