## 这将是一个Vue项目启动脚手架
1. 处理CSS、Less、Sass的过程是先通过Less-Loader,Sass-Loader转译为CSS，再通过PostCSS进行预处理，接着通过CSS-loader打包进CommonJS文件，再通过style-loader通过JS装载进HTML（开发环境），或通过MiniCssExtractPlugin.loader抽离为独立CSS文件
2. 使用.babelrc配置babel presets与plugins，默认支持装饰器语法，类属性语法
3. 使用postcss.config.js配置postcss预处理plugin
4. 默认支持多入口多页面，可轻松配置为单页面

## ToDo
1. 按需load
2. Typescript支持
3. ESlint集成
4. 。。。