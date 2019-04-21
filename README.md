# react 设计 e-commerce
### 前端
#### 基于webpack4 搭建 react开发环境
- 初始化 package.json
- 安装webpack npm i -D webpack
- webpack4 需要安装 npm i -D webpack-cli
- 安装 react react-dom npm i --save react react-dom 
--- 初始化文件夹 -------------------------------
--- 配置webpack出口 入口文件
- 由于react 使用jsx 需要安装babel
-----npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env @babel/preset-react -D 版本要一致
----- .babelrc 创建并配置
- 自动打包生成dist文件夹中的html js npm i html-webpack-plugin -D plugin配置
- 热更新  npm i -D webpack-dev-server 配置devServer new webpack.HotModuleReplacementPlugin()   hot: true, // 开启热更新
- 一直使用 webpack --config webpack/webpack.config.dev.js有点麻烦 因此要指定环境
- 指定环境 npm install -D yargs-parser
- npm i -D cross-env cross-env能跨平台地设置及使用环境变量
- npm i --save @babel/plugin-transform-runtime @babel/runtime
-----在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大。所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。
- npm install --save babel-polyfill
----Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
--- 别名 resolve alias ------------------------
- css loader npm i style-loader css-loader -D
- 引入less  npm i less less-loader -D 或 sass npm i node-sass sass-loader -D
- 拆分 css @next表示可以支持webpack4版本的插件  npm i extract-text-webpack-plugin@next -D
- 添加CSS3前缀
- 如果是在css文件里引入的如背景图之类的图片，就需要指定一下相对路径 引入图片 npm i file-loader url-loader -D
- 页面中经常会用到img标签 npm i html-withimg-loader -D
- 引用字体图片和svg图片

- 清空打包留下的多有js npm i clean-webpack-plugin -D
#### 集成eslint
- 安装eslint 
- npm install -D eslint 
- npm install -D eslint-config-airbnb 
- npm install -D eslint-loader  
- npm install -D eslint-plugin-import 
- npm install -D eslint-plugin-jsx-a11y 
- npm install -D eslint-plugin-react
- .eslintrc 文件
- webpack.config.dev.js 文件中 配置 enforce: 'pre'
- 在 package.json "lint": "eslint --ext .js [要设置的文件加名称]"  "fix": "eslint --fix --ext .js [要设置的文件加名称]"
#### 采用less
#### 采用react全家桶 react-router-dom redux
#### 初始化目录结构
### 后端
### 数据库
