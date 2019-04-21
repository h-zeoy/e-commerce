const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));

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
    new ExtractTextWebpackPlugin('css/style.css'),
    new ExtractTextWebpackPlugin('css/reset.css'),
    new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
  );
}
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'), // 入口文件
  output: {
    filename: pro ? 'app.[chunkhash].js' : 'app.js', // 打包后的文件名称
    path: path.resolve(__dirname, './dist'), // 输出的路径
  }, // 出口文件
  module: {
    rules: [
      {
        enforce: 'pre', //  代表在解析loader之前就先解析eslint-loader
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
    host: 'localhost',
    port: 9090, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true,
  }, // 开发服务器配置
  resolve: {
    // 别名
    alias: {
      '@': path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      pages: path.join(__dirname, 'src/pages'),
    },
    // 省略后缀
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
  },
  devtool: pro ? '' : 'inline-source-map',
};
