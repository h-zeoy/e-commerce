const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
// 友好提示的插件 https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 查找可用端口 // github仓库 https://github.com/indexzero/node-portfinder
const PortFinder = require('portfinder');
// const config = require('../config'); //config文件夹下index.js文件
const config = require('./config');
const utils = require('./utils/notifier');
const alias = require('./webpack/resolve');

const pro = argv.mode == 'production'; //  区别是生产环境和开发环境
const plugin = [];
if (pro) {
  //  线上环境
  plugin.push(
    new HtmlWebpackPlugin({ // 通过new一下这个类来使用插件
      filename: 'index.html',
      template: './src/index.html', // 用哪个html作为模板
      // hash: true, // 会在打包好的bundle.js后面加上hash串
    }),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextWebpackPlugin('css/style.[chunkhash].css'),
    new ExtractTextWebpackPlugin('css/reset.[chunkhash].css'),
    new CleanWebpackPlugin(),
  );
} else {
  //  开发环境
  plugin.push(
    new HtmlWebpackPlugin({ // 通过new一下这个类来使用插件
      filename: 'index.html',
      template: './src/index.html', // 用哪个html作为模板
    }),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextWebpackPlugin({ filename: 'css/style.css', disable: true }),
    new ExtractTextWebpackPlugin({ filename: 'css/reset.css', disable: true }),
    new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
    // copy custom static assets
    new CopyWebpackPlugin([ // 模块CopyWebpackPlugin  将单个文件或整个文件复制到构建目录
      {
        from: path.resolve(__dirname, './static'), // 将static文件夹及其子文件复制到
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    // new FriendlyErrorsPlugin({
    //   compilationSuccessInfo: {
    //     messages: [`Your application is running here: http://${config.dev.host}:${port}`],
    //   },
    // }),
  );
}
const devWebpackConfig = {
  entry: {
    'babel-polyfill': 'babel-polyfill',
    app: path.resolve(__dirname, './src/index.js'),
  }, // 入口文件
  output: {
    filename: pro ? 'app.[chunkhash].js' : 'app.js', // 打包后的文件名称
    publicPath: pro
      // 这里是 /，但要上传到github pages等会路径不对，需要修改为./
      ? config.build.assetsPublicPath
      // 这里配置是 /
      : config.dev.assetsPublicPath,
    path: config.build.assetsRoot, // 输出的路径
  }, // 出口文件
  module: {
    rules: [
      {
        enforce: 'pre', //  代表在解析loader之前就先解析eslint-loader
        test: /\.js$/,
        // exclude: /node_modules/,
        // include: /src/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 解析css
        // use: ['style-loader', 'css-loader'], // 从右向左解析
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.less$/, // 解析less
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
        }),
        // use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/', // 图片打包后存放的目录
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },

    ],
  }, // 处理对应模块
  plugins: plugin, // 对应的插件
  devServer: {
    host: process.env.HOST || config.dev.host,
    port: (process.env.PORT && Number(process.env.PORT)) || config.dev.port, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    compress: true, // 一切服务是否都启用gzip压缩
  }, // 开发服务器配置
  resolve: alias,
  devtool: pro ? '' : 'inline-source-map',
};

// webpack将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量。
module.exports = new Promise((resolve, reject) => {
  PortFinder.basePort = process.env.PORT || config.dev.port;
  PortFinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({ // 出错友好处理插件
        compilationSuccessInfo: { // build成功的话会执行者块
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors // 如果出错就执行这块,其实是utils里面配置好的提示信息
          ? utils.createNotifierCallback()
          : undefined,
      }));

      resolve(devWebpackConfig);
    }
  });
});
