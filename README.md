# Homepage


个人主页.


## 😆 技术栈

基于 `rollup` + `pug` 快速开发简单的静态页面. 开发调试使用 `browser-sync` 进行热更新.


## 🚀 Quick start

样式使用 `dark-sass` . 使用 `vscode` 插件自动编译生成 `css` 文件.

> **Note**
> 1. 修改 src/scss/\*\*/\*.scss 文件，要更新 src/scss/\*\*/index.scss 内容才能及时响应。


1. 安装依赖

   ```bash
   yarn
   ```

2. 运行开发环境

   ```bash
   # 第一次执行之前要先执行 yarn watch
   yarn dev
   ```

3. 打包项目

   ```bash
   yarn build
   ```

配置文件: `.homepage`
